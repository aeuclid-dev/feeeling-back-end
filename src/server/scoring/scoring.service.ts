import { Between } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { getManager } from 'typeorm';
import jStat from 'jstat';
import { google } from 'googleapis';
import { responseToJson } from '../common/util';

import { TestRequestRepository } from '../repositorys/test.repository';
import { PsyCheckRepository } from '../repositorys/psycheck.reporitory';
import { AdminCheckedTestRepository } from '../repositorys/adminCheckedTest.repository';
import { TestScoreRepository } from '../repositorys/testScore.repository';
import { TestFinalScoreRepository } from '../repositorys/testFinalScore.repository';
import { PsyCharRepository } from '../repositorys/psychar.reporitory';
import { PsyItemRepository } from '../repositorys/psyitem.reporitory';
import { PsyNoteRepository } from '../repositorys/psynote.reporitory';
import { StatClassRepository } from '../repositorys/statClass.reporitory';
import { StatRepository } from '../repositorys/stat.reporitory';
import { MemberRepository } from '../repositorys/member.repository';
import { TestResultAllRepository } from '../repositorys/testResultAll.repository';
import { TestResultRepository } from '../repositorys/testResult.repository';
import {
  AdminCheckedTestDto,
  TestScoreInsertDto,
  TestFinalScoreInsertDto,
  TestResultAllInsertDto,
  TestResultInsertDto,
} from '../repositorys/dtos/adminPsy.dto';
import { NoticeRepository } from '../repositorys/notice.repository';
import { noticeDto } from '../repositorys/dtos/notice.dto';

import { push } from '../configs/firebaseNotification';

@Injectable()
export class ScoringService {
  constructor(
    @InjectRepository(TestRequestRepository)
    private testRequestRepository: TestRequestRepository,
    @InjectRepository(PsyCheckRepository)
    private psyCheckRepository: PsyCheckRepository,
    @InjectRepository(AdminCheckedTestRepository)
    private adminCheckedTestRepository: AdminCheckedTestRepository,
    @InjectRepository(TestScoreRepository)
    private testScoreRepository: TestScoreRepository,
    @InjectRepository(TestFinalScoreRepository)
    private testFinalScoreRepository: TestFinalScoreRepository,

    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,

    @InjectRepository(PsyCharRepository)
    private psyCharRepository: PsyCharRepository,
    @InjectRepository(PsyItemRepository)
    private psyItemRepository: PsyItemRepository,
    @InjectRepository(PsyNoteRepository)
    private psyNoteRepository: PsyNoteRepository,
    @InjectRepository(StatClassRepository)
    private statClassRepository: StatClassRepository,
    @InjectRepository(StatRepository)
    private statRepository: StatRepository,
    @InjectRepository(TestResultAllRepository)
    private testResultAllRepository: TestResultAllRepository,
    @InjectRepository(TestResultRepository)
    private testResultRepository: TestResultRepository,
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,

    private http: HttpService,
  ) {}

  async ScoringInitData(date, user): Promise<object> {
    console.log(date);
    let getday = new Date(date);
    console.log(
      getday.getFullYear() + '-' + getday.getMonth() + '-' + getday.getDate(),
    );
    let day1 = new Date(getday.getUTCFullYear(), getday.getUTCMonth(), 1);
    let day2 = new Date(getday.getUTCFullYear(), getday.getUTCMonth() + 1, 0);
    let day3 = new Date(
      getday.getFullYear(),
      getday.getMonth(),
      getday.getDate(),
      0,
      0,
      0,
    );
    let day4 = new Date(
      getday.getFullYear(),
      getday.getMonth(),
      getday.getDate(),
      23,
      59,
      59,
    );
    console.log(day1);
    console.log(day1.valueOf());
    console.log(day2);
    console.log(day2.valueOf());

    console.log(day3);
    console.log(day4);

    let watingRequest = await this.testRequestRepository.count({
      where: { status: 0 },
    });
    //result [[{data},{data}]]
    console.log('testRequest status 0 count ->', watingRequest);

    const manager = getManager();

    // let currentMonth = await this.adminCheckTestRepository.findAndCount({
    //   where: { status: 2, checked_time: Between(1, 10) },
    // });
    // console.log('adminCheck currentMonth status 2 count ->', currentMonth);

    // let today = await this.adminCheckTestRepository.findAndCount({
    //   where: { status: 2, checked_time: Between(1, 10) },
    // });
    // console.log('admin check today status 2 count ->', today);

    // let correntMonth = await manager
    //   .createQueryBuilder()
    //   .select('COUNT(admin_no)')
    //   .from('tb_admin_check_test')
    //   .where('status = 2 AND checked_time BETWEEN :day1 AND :day2', {
    //     day1: 0,
    //     day2: 100,
    //   })
    //   .getRawOne();
    // console.log('adminCheck currentMonth status 2 count ->', currentMonth);

    // let today = await manager
    //   .createQueryBuilder()
    //   .select('COUNT(admin_no)')
    //   .from('tb_admin_check_test')
    //   .where('status = 2 AND checked_time BETWEEN :day1 AND :day2', {
    //     day1: 0,
    //     day2: 100,
    //   })
    //   .getRawOne();
    // console.log('admin check today status 2 count ->', today);

    let a = day1.valueOf();
    let b = day2.valueOf();
    let c = day3.valueOf();
    let d = day4.valueOf();
    console.log('admin_no-->>', user.admin_no);
    let admin_no = user.admin_no;

    let correntMonth = await manager.query(
      `SELECT COUNT(a.admin_no) as cnt
      FROM tb_admin_checked_test AS a
      LEFT JOIN tb_test_request b ON a.test_req_no = b.test_req_no
      WHERE a.checked_time BETWEEN ${a} AND ${b}
      AND a.admin_no = ${admin_no}
      AND a.test_status=2
      `,
    );

    console.log('-corrent->', correntMonth[0].cnt);

    let today = await manager.query(
      `SELECT COUNT(a.admin_no) as cnt
      FROM tb_admin_checked_test AS a
      LEFT JOIN tb_test_request b ON a.test_req_no = b.test_req_no
      WHERE a.checked_time BETWEEN ${c} AND ${d}
      AND a.admin_no = ${admin_no}
      AND a.test_status=2
      `,
    );

    console.log('-today->', today[0].cnt);
    return {
      user_name: user.admin_name,
      watingRequest,
      correntMonth: correntMonth[0].cnt,
      today: today[0].cnt,
    };
  }

  async sendPush(
    userToken: string,
    mes: string,
    mes_title: string,
    test_req_no: number,
  ): Promise<any> {
    console.log('push ready');
    await Promise.all(userToken);

    const message = {
      data: {
        title: mes_title,
        contents: mes,
        id: test_req_no + '',
      },
      token: userToken,
      notification: {
        title: mes_title,
        body: mes,
      },
      android: {
        ttl: 3600 * 1000,
        notification: {
          icon: 'stock_ticker_update',
          color: '#f45342',
        },
      },
      apns: {
        // IOS 설정
        payload: {
          aps: {
            alert: {
              body: mes,
            },
            sound: 'default',
          },
        },
      },
    };

    //console.log('reday to send!! i try it!');
    return new Promise(async (resolve, reject) => {
      if (userToken !== '') {
        try {
          await push.messaging().send(message);
          resolve({ is_success: true, send_push: true });
        } catch (e) {
          console.log('error');
          console.log(e.errorInfo);
          // const userData = await this.memberRepository.findOne({

          // userToken
          // userData.push_token,

          // await repository.update({ firstName: "Timber" }, { firstName: "Rizzrak" });
          // // executes UPDATE user SET firstName = Rizzrak WHERE firstName = Timber

          // await repository.update(1, { firstName: "Rizzrak" });
          // executes UPDATE user SET firstName = Rizzrak WHERE id = 1
          //TODO delete push token
          resolve({ is_success: false, send_push: false });
          //reject(e);
        }
      } else {
        resolve({ is_success: true, send_push: false });
      }
    });
  }

  async RequestTestData(user): Promise<object> {
    const exist_Check_lst = await this.adminCheckedTestRepository.findOne({
      where: { admin_no: user.admin_no, test_status: 1 },
    });
    if (exist_Check_lst) {
      //console.log('exist check lst get olderdata');
      let existData = await this.testRequestRepository.getAdminRequestTest(
        exist_Check_lst.test_req_no,
      );
      //console.log(existData);

      let data = JSON.parse(JSON.stringify(existData));
      return {
        data: data,
      };
    } else {
      //console.log('exist check lst get new data');
      let watingRequest =
        await this.testRequestRepository.getAdminRequestTest();
      //console.log('got a new data???');
      //console.log(watingRequest);
      if (watingRequest !== null && watingRequest !== undefined) {
        let data = JSON.parse(JSON.stringify(watingRequest));
        //console.log(data);

        //1. tb_admin_checked_test에 데이터 insert
        //typeorm의 save를 쓰면 entity에 선언해놓은 primary키때문에 insert가 안되고 같은 admin_no 이기때문에
        //업데이트 처리되어버림.

        const saveNewReqInfo = new AdminCheckedTestDto();
        saveNewReqInfo.admin_no = user.admin_no;
        saveNewReqInfo.test_req_no = data.test_req_no;
        saveNewReqInfo.test_status = 1;
        saveNewReqInfo.user_grade = '';
        saveNewReqInfo.user_comment = '';
        await this.adminCheckedTestRepository.save(saveNewReqInfo);

        //2. tb_test_request status 1 update
        await this.testRequestRepository.update(
          { test_req_no: data.test_req_no },
          { status: 1 },
        );

        return {
          data: data,
        };
      } else {
        return {
          data: null,
        };
      }
      return {
        watingRequest,
      };
    }
  }

  async RequestTestQuestion(test_id): Promise<object> {
    console.log('scoring service requestTestQuestion');

    let categoryRawData = await this.psyCheckRepository
      .createQueryBuilder('tb_psy_check')
      .select('tb_psy_check.check_category as category')
      .where('tb_psy_check.test_id=:test_id', { test_id: test_id })
      .groupBy('tb_psy_check.check_category')
      .orderBy({ 'tb_psy_check.check_category_seq': 'ASC' })
      .getRawMany();

    let categoryData = [];

    if (categoryRawData.length > 0) {
      categoryRawData.map((data) => {
        let getdata = JSON.parse(JSON.stringify(data));
        categoryData.push(getdata.category);
      });
    }

    //console.log(categoryData);

    let data = await this.psyCheckRepository.getPsyCheckLists(test_id); //array data
    return {
      categoryData,
      data,
    };
  }

  async RejectTestRequest(admin_user, data): Promise<object> {
    console.log('scoring service Reject Test Request');
    //console.log(data);
    let actr = await this.adminCheckedTestRepository.update(
      {
        admin_no: admin_user.admin_no,
        test_req_no: data.test_req_no,
      },
      { test_status: 9 },
    );
    let trr = await this.testRequestRepository.update(
      { test_req_no: data.test_req_no },
      { status: 9 },
    );
    //console.log(actr);
    //console.log(trr);

    try {
      const alarm = new noticeDto();
      alarm.test_req_no = data.test_req_no;
      alarm.notice_status = 'rejected';
      alarm.user_no = data.user_no;
      alarm.testee_no = data.testee_no;
      alarm.image_no = data.image_no;

      await this.noticeRepository.save(alarm);
    } catch (e) {
      console.log('test request alarm insert error');
      return responseToJson('100');
    }

    return {};
  }

  async finishDataScore(admin_no, data): Promise<boolean> {
    data.questionData.map(async (answer) => {
      let score = 0;
      let check_id = 0;
      answer.checkScore.map((checkAnswer) => {
        if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
          score = checkAnswer.score;
          check_id = checkAnswer.psy_check_id;
        }
      });
      const saveNewTestScoreInfo = new TestScoreInsertDto();
      saveNewTestScoreInfo.test_req_no = data.testRequestInfo.test_req_no;
      saveNewTestScoreInfo.psy_check_id = check_id;
      saveNewTestScoreInfo.check_score = score;
      saveNewTestScoreInfo.checked_by = admin_no;
      try {
        await this.testScoreRepository.save(saveNewTestScoreInfo);
      } catch (e) {
        console.log(e);
      }
    });
    console.log('test score finish!');
    console.log('test finalscore start');

    Object.entries(data.questionScoreByCategory).map(
      async (objectArr, index) => {
        const finalscore: any = Object.assign({}, objectArr[1]);
        const saveNewTestFinalScoreInfo = new TestFinalScoreInsertDto();
        saveNewTestFinalScoreInfo.test_req_no =
          data.testRequestInfo.test_req_no;
        saveNewTestFinalScoreInfo.test_id = data.testRequestInfo.test_id;
        saveNewTestFinalScoreInfo.user_no = data.testRequestInfo.user_no;
        saveNewTestFinalScoreInfo.check_category = finalscore.categoryName;
        saveNewTestFinalScoreInfo.checked_score = finalscore.checkedScore;
        saveNewTestFinalScoreInfo.tester_adjusted_score =
          finalscore.testerAdjust;
        saveNewTestFinalScoreInfo.final_score = finalscore.finalScore;
        saveNewTestFinalScoreInfo.checked_by = admin_no;

        await this.testFinalScoreRepository.save(saveNewTestFinalScoreInfo);
      },
    );

    return true;
  }

  async finishDataPITR(admin_user, data): Promise<object> {
    // console.log('------------on backend finishData------------------');
    // console.log(data.testRequestInfo);
    // console.log(data.questionData);
    // console.log(data.questionScoreByCategory);
    // console.log(data.PsychologicalStatusText);
    // console.log(data.Recommend);
    // console.log('------------on backend finishData------------------');

    const userData = await this.memberRepository.findOne({
      user_no: data.testRequestInfo.user_no,
    });
    //if (userData) {
    //console.log('check userData');
    //console.log(userData);
    //console.log(userData.push_token);
    //}

    //age
    function getAge(birthday, regdate): number {
      //birthday = yyyy-mm-dd , regdate = timestamp
      let birth = new Date(birthday);
      let birthYear = birth.getFullYear();
      let regday = new Date(regdate);
      let regdayYear = regday.getFullYear();

      let age = regdayYear - birthYear;

      birth.setFullYear(regdayYear);
      if (regday > birth) {
        age;
      } else {
        age--;
      }
      return age;
    }

    //Norm.S.Dist(x,true)
    function cummulativeNormalDist(x): any {
      if (isNaN(x)) return '#VALUE!';
      var mean = 0,
        sd = 1;
      return jStat.normal.cdf(x, mean, sd);
    }

    let beforeData = this.finishDataScore(admin_user.admin_no, data);
    if (beforeData) {
      //console.log('start pitr logic....!!!!!');
      let stressObj: any = {};
      let defenseObj: any = {};
      let psy_class_id: number;
      let psy_char_class_id: string;

      Object.entries(data.questionScoreByCategory).map(
        async (objectArr, index) => {
          const finalscore: any = Object.assign({}, objectArr[1]);
          if (finalscore.categoryName === 'Defense') {
            defenseObj = Object.assign({}, finalscore);
          } else if (finalscore.categoryName === 'Stress') {
            stressObj = Object.assign({}, finalscore);
          } else {
            console.log('error throw exception!!');
          }
        },
      );

      if (stressObj.finalScore <= 21) {
        if (defenseObj.finalScore <= 20) {
          psy_class_id = 1000;
          psy_char_class_id = 'a';
        } else {
          psy_class_id = 1002;
          psy_char_class_id = 'c';
        }
      } else if (stressObj.finalScore <= 28) {
        if (defenseObj.finalScore <= -(5 / 7) * stressObj.finalScore + 35) {
          psy_class_id = 1002;
          psy_char_class_id = 'c';
        } else if (
          defenseObj.finalScore <=
          (5 / 7) * stressObj.finalScore + 5
        ) {
          psy_class_id = 1000;
          psy_char_class_id = 'a';
        } else {
          psy_class_id = 1004;
          psy_char_class_id = 'h';
        }
      } else if (stressObj.finalScore <= 35) {
        if (defenseObj.finalScore <= -(5 / 7) * stressObj.finalScore + 45) {
          psy_class_id = 1001;
          psy_char_class_id = 'b';
        } else if (
          defenseObj.finalScore <=
          (5 / 7) * stressObj.finalScore - 5
        ) {
          psy_class_id = 1003;
          psy_char_class_id = 'd';
        } else {
          psy_class_id = 1004;
          psy_char_class_id = 'h';
        }
      } else {
        if (defenseObj.finalScore <= 20) {
          psy_class_id = 1003;
          psy_char_class_id = 'd';
        } else {
          psy_class_id = 1001;
          psy_char_class_id = 'b';
        }
      }
      //console.log(psy_class_id, psy_char_class_id);

      const poseQuestionArray = [1000, 1001, 1002, 1003];
      let poseQeustionScore: number = 0;
      const faceQuestionArray = [1004];
      let psy_check_face: number = 0;
      const mirrorQuestionArray = [1005, 1006];
      let mirrorQeustionScore: number = 0;
      const shoesQuestionArray = [1007];
      let psy_check_shoes: number = 0;
      const telescopeQuestionArray = [1008];
      let psy_check_telescope: number = 0;
      const potionQuestionArray = [1009];
      let psy_check_potion: number = 0;

      data.questionData.map(async (answer) => {
        if (poseQuestionArray.includes(answer.psy_check_id)) {
          answer.checkScore.map((checkAnswer) => {
            if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
              poseQeustionScore = poseQeustionScore + checkAnswer.score;
            }
          });
        } else if (faceQuestionArray.includes(answer.psy_check_id)) {
          answer.checkScore.map((checkAnswer) => {
            if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
              psy_check_face = psy_check_face + checkAnswer.score;
            }
          });
        } else if (mirrorQuestionArray.includes(answer.psy_check_id)) {
          answer.checkScore.map((checkAnswer) => {
            if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
              mirrorQeustionScore = mirrorQeustionScore + checkAnswer.score;
            }
          });
        } else if (shoesQuestionArray.includes(answer.psy_check_id)) {
          answer.checkScore.map((checkAnswer) => {
            if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
              psy_check_shoes = psy_check_shoes + checkAnswer.score;
            }
          });
        } else if (telescopeQuestionArray.includes(answer.psy_check_id)) {
          answer.checkScore.map((checkAnswer) => {
            if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
              psy_check_telescope = psy_check_telescope + checkAnswer.score;
            }
          });
        } else if (potionQuestionArray.includes(answer.psy_check_id)) {
          answer.checkScore.map((checkAnswer) => {
            if (answer.checkScoreSelect === checkAnswer.psy_check_score_id) {
              psy_check_potion = psy_check_potion + checkAnswer.score;
            }
          });
        } else {
          //console.log('questionData got else', answer.psy_check_id);
        }
      });

      let psy_check_pose: number;
      if (poseQeustionScore < 4) {
        psy_check_pose = 1;
      } else if (poseQeustionScore < 8) {
        psy_check_pose = 2;
      } else {
        psy_check_pose = 3;
      }
      //console.log('psy_check_pose -> ', psy_check_pose);

      //psy_char 변수에 값 저장  test_id || psy_char_class_id || psy_check_pose || psy_check_face
      const psy_char: string =
        data.testRequestInfo.test_id.toString() +
        psy_char_class_id +
        psy_check_pose.toString() +
        psy_check_face.toString();

      //console.log('psy_char -> ', psy_char);

      let psy_check_mirror: string = '';
      if (mirrorQeustionScore < 2) {
        psy_check_mirror = '11';
      } else if (mirrorQeustionScore < 4) {
        psy_check_mirror = '12';
      } else {
        psy_check_mirror = '13';
      }
      const psy_item_mirror: string =
        data.testRequestInfo.test_id.toString() + psy_check_mirror;

      //console.log('psy_item_mirror -> ', psy_item_mirror);
      let psy_check_shoes_value: string = '';
      if (psy_check_shoes === 1) {
        psy_check_shoes_value = '21';
      } else if (psy_check_shoes === 2) {
        psy_check_shoes_value = '22';
      } else {
        psy_check_shoes_value = '23';
      }
      const psy_item_shoes: string =
        data.testRequestInfo.test_id.toString() + psy_check_shoes_value;

      //console.log('psy_item_shoes -> ', psy_item_shoes);
      let psy_check_telescope_value: string = '';
      if (psy_check_telescope === 1) {
        psy_check_telescope_value = '31';
      } else if (psy_check_telescope === 2) {
        psy_check_telescope_value = '32';
      } else {
        psy_check_telescope_value = '33';
      }
      const psy_item_telescope: string =
        data.testRequestInfo.test_id.toString() + psy_check_telescope_value;

      //console.log('psy_item_telescope -> ', psy_item_telescope);
      let psy_check_potion_value: string = '';
      if (psy_check_potion === 1) {
        psy_check_potion_value = '41';
      } else if (psy_check_potion === 2) {
        psy_check_potion_value = '42';
      } else {
        psy_check_potion_value = '43';
      }
      const psy_item_potion: string =
        data.testRequestInfo.test_id.toString() + psy_check_potion_value;

      //console.log('psy_item_potion -> ', psy_item_potion);
      const psynote = await this.psyNoteRepository.find({
        psy_class_id: psy_class_id,
      });

      const psy_char_img_data = await this.psyCharRepository.findOne({
        psy_char_code: psy_char,
      });
      const psy_item1 = await this.psyItemRepository.findOne({
        psy_item_img: psy_item_mirror,
      });
      const psy_item2 = await this.psyItemRepository.findOne({
        psy_item_img: psy_item_shoes,
      });
      const psy_item3 = await this.psyItemRepository.findOne({
        psy_item_img: psy_item_telescope,
      });
      const psy_item4 = await this.psyItemRepository.findOne({
        psy_item_img: psy_item_potion,
      });
      const psy_note_title = psynote.filter(
        (psynotedata) => psynotedata.note_type === 'title',
      ); //only one

      const psy_note_sub_title = psynote.filter(
        (psynotedata) => psynotedata.note_type === 'sub_title',
      ); //maybe many data
      const psy_note_main_status = psynote.filter(
        (psynotedata) => psynotedata.note_type === 'main_status',
      ); //only one
      const psy_note_detail_status = psynote.filter(
        (psynotedata) => psynotedata.note_type === 'detail_status',
      ); //maybe many data
      const psy_note_detail_solution = psynote.filter(
        (psynotedata) => psynotedata.note_type === 'detail_solution',
      ); //maybe many data
      //console.log('data ready for create insertData');
      const saveNewTestFinalResultAllScore = new TestResultAllInsertDto();
      // console.log(
      //   'data.testRequestInfo.test_req_no -> ',
      //   data.testRequestInfo.test_req_no,
      // );
      saveNewTestFinalResultAllScore.test_req_no =
        data.testRequestInfo.test_req_no;

      saveNewTestFinalResultAllScore.psy_note_sub_title =
        psy_note_sub_title.length > 1
          ? psy_note_sub_title[
              Math.floor(Math.random() * psy_note_sub_title.length)
            ].note
          : psy_note_sub_title[0].note;

      // console.log('mm');
      // console.log(psy_note_title);
      try {
        saveNewTestFinalResultAllScore.psy_note_title = psy_note_title[0].note;
      } catch (e) {
        console.log('try error');
        console.log(e);
      }

      saveNewTestFinalResultAllScore.psy_char_img =
        psy_char_img_data.psy_char_img;

      saveNewTestFinalResultAllScore.psy_item_img1 = psy_item1.psy_item_img;
      saveNewTestFinalResultAllScore.psy_item_name1 = psy_item1.psy_item_name;
      saveNewTestFinalResultAllScore.psy_item_comment1 =
        psy_item1.psy_item_comment;
      saveNewTestFinalResultAllScore.psy_item_feature1 =
        psy_item1.psy_item_feature;
      saveNewTestFinalResultAllScore.psy_item_desc1 = psy_item1.psy_item_desc;

      saveNewTestFinalResultAllScore.psy_item_img2 = psy_item2.psy_item_img;
      saveNewTestFinalResultAllScore.psy_item_name2 = psy_item2.psy_item_name;
      saveNewTestFinalResultAllScore.psy_item_comment2 =
        psy_item2.psy_item_comment;
      saveNewTestFinalResultAllScore.psy_item_feature2 =
        psy_item2.psy_item_feature;
      saveNewTestFinalResultAllScore.psy_item_desc2 = psy_item2.psy_item_desc;

      saveNewTestFinalResultAllScore.psy_item_img3 = psy_item3.psy_item_img;
      saveNewTestFinalResultAllScore.psy_item_name3 = psy_item3.psy_item_name;
      saveNewTestFinalResultAllScore.psy_item_comment3 =
        psy_item3.psy_item_comment;
      saveNewTestFinalResultAllScore.psy_item_feature3 =
        psy_item3.psy_item_feature;
      saveNewTestFinalResultAllScore.psy_item_desc3 = psy_item3.psy_item_desc;

      saveNewTestFinalResultAllScore.psy_item_img4 = psy_item4.psy_item_img;
      saveNewTestFinalResultAllScore.psy_item_name4 = psy_item4.psy_item_name;
      saveNewTestFinalResultAllScore.psy_item_comment4 =
        psy_item4.psy_item_comment;
      saveNewTestFinalResultAllScore.psy_item_feature4 =
        psy_item4.psy_item_feature;
      saveNewTestFinalResultAllScore.psy_item_desc4 = psy_item4.psy_item_desc;

      saveNewTestFinalResultAllScore.psy_note_main_status =
        psy_note_main_status[0].note;
      saveNewTestFinalResultAllScore.psy_note_detail_status =
        (data.Recommend !== null && data.Recommend !== ''
          ? data.Recommend
          : '') +
        ' ' +
        (psy_note_detail_status.length > 1
          ? psy_note_detail_status[
              Math.floor(Math.random() * psy_note_detail_status.length)
            ].note
          : psy_note_detail_status[0].note);

      saveNewTestFinalResultAllScore.test_name = data.testRequestInfo.test_desc;
      //test_score 이부분 체크해야함 방금 데이터 넣은것을 기준으로 하려는건지 아니면 기존에 있는데이터를 가지고 하려는건지 확인.
      //전자의 경우 지금상태 유지하면 ㅇㅋ 후자의 경우 없을때 처리방안 체크.
      const calc_test_score = Math.round(
        ((stressObj.finalScore - defenseObj.finalScore + 16) * 100) / 48,
      );

      saveNewTestFinalResultAllScore.test_score = calc_test_score;
      saveNewTestFinalResultAllScore.stat_class1 = '전체';
      saveNewTestFinalResultAllScore.stat_class_name1 = '전체';

      const stat_percentage1_data = await this.statClassRepository.findOne({
        stat_class: '전체',
      });
      const stat_percentage1_data2 = await this.statRepository.findOne({
        where: { stat_class_id: stat_percentage1_data.stat_class_id },
        order: { stat_date: 'DESC' },
      });

      const stat_percentage1_Z =
        (calc_test_score - stat_percentage1_data2.stat_class_avg) /
        stat_percentage1_data2.stat_class_std;
      const stat_percentage1 = Math.round(
        cummulativeNormalDist(stat_percentage1_Z) * 100,
      );

      // console.log('stat_percentage1_Z');
      // console.log(
      //   '(' +
      //     calc_test_score +
      //     ' - ' +
      //     stat_percentage1_data2.stat_class_avg +
      //     ') /' +
      //     stat_percentage1_data2.stat_class_std,
      // );
      // console.log(stat_percentage1_Z);
      // console.log(stat_percentage1);

      saveNewTestFinalResultAllScore.stat_percentage1 = stat_percentage1;
      saveNewTestFinalResultAllScore.stat_class2 = '성별';

      const stat_class2_data = await this.statClassRepository.findOne({
        stat_class: '성별',
        stat_flag: data.testRequestInfo.gender,
      });

      const stat_class2_data2 = await this.statRepository.findOne({
        where: { stat_class_id: stat_class2_data.stat_class_id },
        order: { stat_date: 'DESC' },
      });

      const stat_percentage2_Z =
        (calc_test_score - stat_class2_data2.stat_class_avg) /
        stat_class2_data2.stat_class_std;
      const stat_percentage2 = Math.round(
        cummulativeNormalDist(stat_percentage2_Z) * 100,
      );
      // console.log('stat_percentage2_Z');
      // console.log(
      //   '(' +
      //     calc_test_score +
      //     ' - ' +
      //     stat_class2_data2.stat_class_avg +
      //     ') /' +
      //     stat_class2_data2.stat_class_std,
      // );
      // console.log(stat_percentage2_Z);
      // console.log(stat_percentage2);

      saveNewTestFinalResultAllScore.stat_class_name2 =
        stat_class2_data.stat_name;
      saveNewTestFinalResultAllScore.stat_percentage2 = stat_percentage2;
      saveNewTestFinalResultAllScore.stat_class3 = '나이';
      //yyyy-mm-dd
      const testee_age = getAge(
        data.testRequestInfo.birthday,
        data.testRequestInfo.test_time,
      );

      let class3_flag: number = 0;
      if (testee_age < 10) {
        class3_flag = 1;
      } else if (testee_age < 20) {
        class3_flag = 2;
      } else if (testee_age < 30) {
        class3_flag = 3;
      } else if (testee_age < 40) {
        class3_flag = 4;
      } else if (testee_age < 50) {
        class3_flag = 5;
      } else if (testee_age < 60) {
        class3_flag = 6;
      } else {
        class3_flag = 7;
      }

      const stat_class3_data = await this.statClassRepository.findOne({
        stat_class: '나이',
        stat_flag: class3_flag,
      });
      const stat_class3_data2 = await this.statRepository.findOne({
        where: { stat_class_id: stat_class3_data.stat_class_id },
        order: { stat_date: 'DESC' },
      });
      const stat_percentage3_Z =
        (calc_test_score - stat_class3_data2.stat_class_avg) /
        stat_class3_data2.stat_class_std;

      const stat_percentage3 = Math.round(
        cummulativeNormalDist(stat_percentage3_Z) * 100,
      );

      // console.log('stat_percentage2_Z');
      // console.log(
      //   '(' +
      //     calc_test_score +
      //     ' - ' +
      //     stat_class3_data2.stat_class_avg +
      //     ') /' +
      //     stat_class3_data2.stat_class_std,
      // );
      // console.log(stat_percentage3_Z);
      // console.log(stat_percentage3);

      saveNewTestFinalResultAllScore.stat_class_name3 =
        stat_class3_data.stat_name;
      saveNewTestFinalResultAllScore.stat_percentage3 = stat_percentage3;

      saveNewTestFinalResultAllScore.psy_note_detail_solution =
        (data.Recommend !== null && data.Recommend !== ''
          ? data.PsychologicalStatusText
          : '') +
        ' ' +
        (psy_note_detail_solution.length > 1
          ? psy_note_detail_solution[
              Math.floor(Math.random() * psy_note_detail_solution.length)
            ].note
          : psy_note_detail_solution[0].note);
      saveNewTestFinalResultAllScore.checked_by = admin_user.admin_no;

      // console.log(
      //   '------------------------insert Data!!!------------------------------',
      // );
      //console.log(saveNewTestFinalResultAllScore);
      try {
        await this.testResultAllRepository.save(saveNewTestFinalResultAllScore);
      } catch (e) {
        console.log('final insert error!!!!');
        console.log(e);
      }
      // console.log(
      //   '--------------------------------------------------------------------',
      // );

      // const insertResult = new TestResultInsertDto();
      // insertResult.test_req_no = data.testRequestInfo.test_req_no;
      // insertResult.result = JSON.stringify(saveNewTestFinalResultAllScore);
      // try {
      //   await this.testResultRepository.save(insertResult);
      // } catch (e) {
      //   console.log('result err');
      //   console.log(e);
      // }

      //tb_test_request status 1 update
      try {
        await this.testRequestRepository.update(
          { test_req_no: data.testRequestInfo.test_req_no },
          { status: 2 },
        );
      } catch (e) {
        console.log('tb_request update error');
        console.log(e);
      }

      //tb_admin_checked_test 1은 검사 진행중임을, 2는 검사완료임을 나타냄, 8은 담당자가 스코어링 하기 어려운 검사, 9는 최종적으로 검사에 부적합한 그림으로 피드백 ',
      try {
        await this.adminCheckedTestRepository.update(
          {
            admin_no: admin_user.admin_no,
            test_req_no: data.testRequestInfo.test_req_no,
          },
          { test_status: 2 },
        );
      } catch (e) {
        console.log('tb_request update error');
        console.log(e);
      }

      try {
        const alarm = new noticeDto();
        alarm.test_req_no = data.testRequestInfo.test_req_no;
        alarm.notice_status = 'completed';
        alarm.user_no = data.testRequestInfo.user_no;
        alarm.testee_no = data.testRequestInfo.testee_no;
        alarm.image_no = data.testRequestInfo.image_no;

        await this.noticeRepository.save(alarm);
      } catch (e) {
        console.log('test request alarm insert error');
        return responseToJson('100');
      }

      console.log('insert ok');
      console.log('send result to user');
      const message_title = '그림검사결과';
      const message =
        data.testRequestInfo.nickname +
        '님이 그린 ' +
        data.testRequestInfo.test_desc +
        ' 심리검사 결과가 도착했습니다.';
      return this.sendPush(
        userData.push_token,
        message,
        message_title,
        data.testRequestInfo.test_req_no,
      );
    } else {
      return {
        result: false,
      };
    }
    return {};
  }

  async pushtest(): Promise<object> {
    const message_title = '그림검사결과';
    const message = '님이 그린 심리검사 결과가 도착했습니다.';
    const test_user_no = 2;
    const testuser = await this.memberRepository.findOne({
      where: { user_no: test_user_no },
    });
    console.log(testuser);
    if (testuser.push_token !== null && testuser.push_token !== '') {
      this.sendPush(testuser.push_token, message, message_title, 9);
      return {
        message: 'ok',
      };
    } else {
      return {
        message: 'no_token',
      };
    }
  }
}
