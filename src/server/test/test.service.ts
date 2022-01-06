import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeToKorMsg } from '../common/errorcode.config';
import {
  testeeListDto,
  testMemberInfoDto,
} from '../repositorys/dtos/member.dto';
import { ImageDto } from '../repositorys/dtos/Image.dto';
import { noticeDto } from '../repositorys/dtos/notice.dto';
import { testRequestDto, testListDto } from '../repositorys/dtos/test.dto';
import { AnswerDto } from '../repositorys/dtos/answer.dto';

import { MemberRepository } from '../repositorys/member.repository';
import {
  TestRepository,
  TesteeRepository,
} from '../repositorys/testee.repository';
import { TestRequestRepository } from '../repositorys/test.repository';
import { TestQuestionRepository } from '../repositorys/question.reporitory';
import { ImageRepository } from '../repositorys/image.repository';
import { AnswerRepository } from '../repositorys/answer.repository';
import { TestResultAllRepository } from '../repositorys/testResultAll.repository';

import { TbUser } from '../feelingmodel/entities/TbUser';
import { buffer } from 'node:stream/consumers';
import { Blob } from 'buffer';
import { responseToJson, imageFinishWork } from '../common/util';

import * as path from 'path';
import * as fs from 'fs';
import { NoticeRepository } from '../repositorys/notice.repository';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
    private TesteeRepository: TesteeRepository,
    private TestRequestRepository: TestRequestRepository,
    private TestQuestionRepository: TestQuestionRepository,
    private TestRepository: TestRepository,
    private ImageRepository: ImageRepository,
    private AnswerRepository: AnswerRepository,
    private TestResultAllRepository: TestResultAllRepository,
    private noticeRepository: NoticeRepository,
  ) {}

  async CallTesteesList(TbUser: TbUser): Promise<object> {
    try {
      const result_data = await this.TesteeRepository.find({
        user_no: TbUser.user_no,
      });
      const returnResult = {
        list: result_data,
      };
      return responseToJson('000', returnResult);
    } catch (error) {
      console.log('error!! -->');
      console.log(error);
      return responseToJson('100');
    }
  }

  async CallUserSummary(TbUser: TbUser): Promise<object> {
    try {
      const userInfoResult: any = await this.memberRepository.getUserInfo(
        TbUser,
      );
      const returnResult = {
        nickname: userInfoResult.nickname,
        type: userInfoResult.type,
        point: userInfoResult.point,
        post: userInfoResult.test.filter((req) => req.status < 2).length,
        profile_photo: userInfoResult.profile_photo,
        test: userInfoResult.test.filter((req) => req.status > 1).length,
        user_id: userInfoResult.user_id,
        user_no: userInfoResult.user_no,
      };
      return responseToJson('000', returnResult);
    } catch (error) {
      console.log('error!! -->');
      console.log(error);
      return responseToJson('100');
    }
  }

  async CallTestList(passObj: testListDto): Promise<object> {
    console.log('callTestRequest List..');
    console.log(passObj);
    try {
      const reslutData = await this.TestRequestRepository.getTestLists(passObj);
      const resultToJson = JSON.parse(JSON.stringify(reslutData));
      //console.log('listlength>>', resultToJson.length);
      if (resultToJson.length > 0) {
        const returnResult = {
          list: resultToJson,
        };
        return responseToJson('000', returnResult);
      } else {
        return responseToJson('222');
      }
    } catch (error) {
      console.log('error!! -->');
      console.log(error);
      return responseToJson('100');
    }
  }

  async CallTestType(): Promise<object> {
    try {
      const reslutData = await this.TestRepository.find({
        select: ['test_id', 'test_name', 'test_desc'],
        where: { use_yn: 'Y' },
      });
      const returnResult = {
        list: reslutData,
      };
      return responseToJson('000', returnResult);
    } catch (error) {
      console.log('error!! --> testType');
      console.log(error);
      return responseToJson('100');
    }
  }

  async CallTestQuestion(object): Promise<object> {
    try {
      const reslutData = await this.TestQuestionRepository.getQuestionLists(
        object,
      );
      const returnResult = {
        list: reslutData,
      };
      return responseToJson('000', returnResult);
    } catch (error) {
      console.log('error!! --> testQuestion');
      console.log(error);
      return responseToJson('100');
    }
  }

  async CallAddTestee(user_no, params, file): Promise<object> {
    const setNewTestee = new testMemberInfoDto();
    let photoId = '';
    const withFile =
      file !== undefined &&
      Object.keys(file).length > 0 &&
      JSON.stringify(file) !== JSON.stringify({})
        ? true
        : false;
    //console.log('withFile ? >>> ', withFile);
    setNewTestee.user_no = user_no;
    setNewTestee.nickname = params.nickname;
    setNewTestee.birthday = params.birthday;
    setNewTestee.gender = params.gender;
    setNewTestee.type = params.type;
    if (withFile) {
      let photoIdArray = file.filename.split('.');
      photoId = photoIdArray[0];
      setNewTestee.profile_photo = photoId;
    }

    try {
      const reslutData = await this.TesteeRepository.createTesteeUser(
        setNewTestee,
      );

      if (withFile) {
        //correntfile to profileImage change
        const imagework = await imageFinishWork(photoId, 1, {
          user_no: user_no,
          //user_id: res.data.user_id,
          testee_no: reslutData.testee_no,
          reg_time: reslutData.reg_time,
        });

        let updateImageInfo = {
          profile_photo: imagework.image_id,
        };

        //testee photoID update
        try {
          await this.TesteeRepository.update(
            reslutData.testee_no,
            updateImageInfo,
          );
        } catch (e) {
          console.log(e);
        }
      }
      const returnResult = {
        testee_no: reslutData.testee_no,
      };
      return responseToJson('000', returnResult);
    } catch (error) {
      return responseToJson('223');
    }
  }

  async TestFileUpload(file, res): Promise<object> {
    //TODO python call 하고 기다렸다가 파일 완성되면
    //옮겨놓고 그 파일 path로 진행해야함. 일단은 이렇게 작업 해놓고 기본적인거
    //다해놓은다음 작업 ㄱㄱ...
    const imagePath = file.filename;
    const correct_image_id = imagePath.split('.');

    // console.log('user upload testImage');
    // console.log(file);

    var exec = require('child_process').execFileSync;

    var fun = function () {
      console.log('fun() start!!');
      let pythonExePath = 'PageDetectionNew/PageDetectionNew.exe';
      let is_success_call_python = false;
      console.log('just service change ok?');
      if (!fs.existsSync(pythonExePath)) {
        console.log('cant find pythonexe..');
        console.log('ENOENT pythonExe...');
        fs.mkdirSync('PageDetectionNewExist');
        file.path.replace('_temp', '');
        is_success_call_python = true;
        console.log('fin test');
      } else {
        console.log('file path... check!');
        console.log(file.path);
        console.log(file.path.replace('_temp', ''));
        console.log('##################################################');
        try {
          exec(
            pythonExePath,
            [file.path, file.path.replace('_temp', '')],
            { windowsHide: true },
            function (err, data) {
              if (err === null) {
                is_success_call_python = true;
              }
              console.log('got error?');
              console.log(err);
              console.log('finished');
              console.log(data.toString());
            },
          );
        } catch (e) {
          console.log('exec try catch error');
          console.log(e);
        }
      }
      return is_success_call_python;
    };

    //python 이미지 세우는부분 일단 주석...21/12/24
    // const fileResult = await fun();
    // console.log('get result from python exe;');
    // console.log(fileResult);

    const fileData = fs.readFileSync(file.path);
    if (fileData) {
      let headerSetObj = {
        'Content-Type': 'image/jpeg',
        status: '000',
        status_message: ErrorCodeToKorMsg('000'),
        correct_image_id: correct_image_id[0],
      };
      res.set(headerSetObj);
      return res.end(fileData);
    } else {
      let headerSetObj = {
        'Content-Type': 'image/jpeg',
        status: '100',
        status_message: ErrorCodeToKorMsg('100'),
        correct_image_id: correct_image_id[0],
      };
      return res.end(fileData);
    }
  }

  async RequestTest(userInfo, testInfo): Promise<object> {
    const saveImageInfo = new ImageDto();
    const testRequestInfo = new testRequestDto();

    //이미지 관련 작업 진행 필요함.
    saveImageInfo.testee_no = testInfo.testee_no;
    saveImageInfo.image_id = testInfo.correct_image_id;
    saveImageInfo.image_comment = testInfo.image_comment;
    let imageinfo: any = '';
    let requestinfo: any = '';

    try {
      imageinfo = await this.ImageRepository.createImage(saveImageInfo);
    } catch (error) {
      console.log(error);
      return responseToJson('100');
    }

    testRequestInfo.user_no = userInfo.user_no;
    testRequestInfo.user_id = userInfo.user_id;
    testRequestInfo.test_id = testInfo.test_id;
    testRequestInfo.testee_no = testInfo.testee_no;
    testRequestInfo.test_question = JSON.stringify(testInfo.test_questions);
    testRequestInfo.image_no = imageinfo.image_no;

    try {
      requestinfo = await this.TestRequestRepository.createTestRequestData(
        testRequestInfo,
      );
    } catch (error) {
      console.log(error);
      return responseToJson('100');
    }

    for (let answerData of testInfo.test_questions) {
      let answerinfo = new AnswerDto();
      answerinfo.answer = answerData.answer;
      answerinfo.answer_no = answerData.answer_no;
      answerinfo.question_no = answerData.question_no;
      answerinfo.test_req_no = requestinfo.test_req_no;
      answerinfo.user_no = userInfo.user_no;
      answerinfo.test_id = testInfo.test_id;

      try {
        await this.AnswerRepository.createUserTestAnswer(answerinfo);
      } catch (error) {
        console.log(error);
        return responseToJson('100');
      }
    }

    /**
     * corrent image_id , type      ,data object
     *                    0 test      test_req_no,test_time
     *                    1 profile
     */
    const imagework = await imageFinishWork(testInfo.correct_image_id, 0, {
      test_req_no: requestinfo.test_req_no,
      test_time: requestinfo.test_time,
    });

    let updateImageInfo = {
      image_id: imagework.image_id,
    };

    try {
      await this.ImageRepository.update(imageinfo.image_no, updateImageInfo);
    } catch (error) {
      console.log(error);
      return responseToJson('100');
    }

    try {
      const alarm = new noticeDto();
      alarm.test_req_no = requestinfo.test_req_no;
      alarm.notice_status = 'requested';
      alarm.user_no = userInfo.user_no;
      alarm.testee_no = testInfo.testee_no;
      alarm.image_no = imageinfo.image_no;

      await this.noticeRepository.save(alarm);
    } catch (e) {
      console.log('test request alarm insert error');
      return responseToJson('100');
    }

    return responseToJson('000');
  }

  async getTestResult(userInfo, request_test_data): Promise<object> {
    try {
      const reslutData = await this.TestResultAllRepository.findOne(
        request_test_data,
      );
      const returnResult = {
        data: reslutData,
      };
      return responseToJson('000', returnResult);
    } catch (error) {
      console.log('error!! --> getTestResult');
      console.log(error);
      return responseToJson('100');
    }
  }
}
