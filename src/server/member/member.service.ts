import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  existMemberDto,
  JoinMemberDto,
  loginMemberDto,
  testMemberInfoDto,
} from '../repositorys/dtos/member.dto';
import { MemberRepository } from '../repositorys/member.repository';
import { TesteeRepository } from '../repositorys/testee.repository';
import { AuthService } from '../auth/auth.service';
import {
  getTimeStampUTC,
  getTimeFormatUTC,
  imageFinishWork,
} from '../common/util';
import * as fs from 'fs';
//import { Connection } from 'typeorm';
import { responseToJson } from '../common/util';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
    private TesteeRepository: TesteeRepository,
    private authService: AuthService, //private connection: Connection
  ) {}
  private resultObject = {};
  /**
   * @param JoinMemberDto 회원가입데이터.
   * @param file file업로드 선택사항. 있는경우 images/corrent에 선저장후 데이터에 맞춰 폴더이동처리.
   * @returns object
   */
  async newMember(JoinMemberDto: JoinMemberDto, file): Promise<object> {
    //const queryRunner = this.connection.createQueryRunner();
    const withFile =
      file !== undefined &&
      Object.keys(file).length > 0 &&
      JSON.stringify(file) !== JSON.stringify({})
        ? true
        : false;
    //console.log('withFile ? >>> ', withFile);

    if (withFile) {
      let photoId = file.filename.split('.');
      JoinMemberDto.profile_photo = photoId[0];
    }

    const check_user_id_length = await this.memberRepository.count({
      user_id: JoinMemberDto.user_id,
    });
    console.log(check_user_id_length);
    if (check_user_id_length > 0) {
      console.log('exist user_id ');
      return responseToJson('203');
    }

    try {
      let res = await this.memberRepository.createUser(JoinMemberDto);
      if (res.result) {
        console.log('insert ok and return got a data...');
        console.log(res.data);
        //user_no를 가지고 testee 데이터랑 profile_photo 업데이트 쳐줘야함

        const setNewTestee = new testMemberInfoDto();
        setNewTestee.user_no = res.data.user_no;
        setNewTestee.nickname = res.data.nickname;
        setNewTestee.birthday = res.data.birthday;
        setNewTestee.gender = res.data.gender;
        setNewTestee.profile_photo = res.data.profile_photo;

        try {
          const reslutData = await this.TesteeRepository.createTesteeUser(
            setNewTestee,
          );
          if (withFile) {
            //correntfile to profileImage change
            const imagework = await imageFinishWork(res.data.profile_photo, 1, {
              user_no: res.data.user_no,
              user_id: res.data.user_id,
              testee_no: reslutData.testee_no,
              reg_time: res.data.reg_time,
            });

            let updateImageInfo = {
              profile_photo: imagework.image_id,
            };

            //user photoID update
            try {
              await this.memberRepository.update(
                res.data.user_no,
                updateImageInfo,
              );
            } catch (error) {
              console.log(error);
            }
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
        } catch (e) {
          console.log(e);
        }
        return responseToJson('000');
      } else {
        console.log(res.error);
        return responseToJson('200');
      }
    } catch (error) {
      console.log('error!! -->');
      console.log(error);
      return responseToJson('100');
    }
  }

  async loginMember(loginMemberDto: loginMemberDto): Promise<Object> {
    console.log('login result in services');
    const { type, user_id, pwd, push_token } = loginMemberDto;
    let result_data: any = {};
    if (type === 0) {
      console.log('nomal login');
      result_data = await this.memberRepository.findOne({
        user_id: user_id,
        pwd: pwd,
      });
    } else {
      console.log('sns login');
      result_data = await this.memberRepository.findOne({
        sns_id: parseInt(user_id),
      });
    }
    //console.log(result_data);
    if (result_data !== undefined) {
      //login성공시 업데이트 하는 데이터 체크.
      //user_no,auth_token,push_token,type,last_access_time
      loginMemberDto.user_no = result_data.user_no;
      const token = await this.authService.login(loginMemberDto);
      let updateUserData: any = {};
      updateUserData.user_no = result_data.user_no;
      updateUserData.auth_token = token;
      updateUserData.push_token = loginMemberDto.push_token;
      updateUserData.type = loginMemberDto.type;
      updateUserData.last_access_time = getTimeStampUTC().toString();

      this.memberRepository.updateUser(updateUserData);

      return responseToJson('000', { token: token });
    } else {
      console.log('login no');
      return responseToJson('220');
    }
  }
  async getExistCheck(id: string, type: number): Promise<Object> {
    let queryResult = 0;
    if (type === 0) {
      queryResult = await this.memberRepository.count({ user_id: id });
    } else {
      queryResult = await this.memberRepository.count({
        sns_id: parseInt(id),
        type: type,
      });
    }
    let is_exist = 0;
    let errCode = '';
    if (queryResult < 1) {
      is_exist = 0;
      errCode = '000';
    } else {
      is_exist = 1;
      if (type === 0) {
        errCode = '200';
      } else if (type === 1) {
        errCode = '201';
      } else if (type === 2) {
        errCode = '202';
      }
    }
    const returnResult = {
      is_exist: is_exist,
    };
    //console.log(returnResult);
    return responseToJson(errCode, returnResult);
  }

  async LogoutMember(user): Promise<Object> {
    try {
      await this.memberRepository.update(user.user_no, {
        auth_token: '',
        push_token: '',
        updt_time: getTimeStampUTC().toString(),
        updt_datetime: getTimeFormatUTC('yyyy-MM-DD HH:mm:ss').toString(),
        last_access_time: getTimeStampUTC().toString(),
      });

      return responseToJson('000');
    } catch (e) {
      return responseToJson('100');
    }
  }

  async TokenRenewal(user, body): Promise<Object> {
    try {
      await this.memberRepository.update(user.user_no, {
        push_token: body.push_token,
        updt_time: getTimeStampUTC().toString(),
        updt_datetime: getTimeFormatUTC('yyyy-MM-DD HH:mm:ss').toString(),
        last_access_time: getTimeStampUTC().toString(),
      });
      return responseToJson('000');
    } catch (e) {
      return responseToJson('100');
    }
  }
  async EditMember(ExclusiveEditDto, file, userInfoFromToken) {
    const { type } = ExclusiveEditDto;
    const withFile =
      file !== undefined &&
      Object.keys(file).length > 0 &&
      JSON.stringify(file) !== JSON.stringify({})
        ? true
        : false;
    console.log('EditTestee -> withFile ? >>> ', withFile);

    let updateTesteeData: any = {};
    if (withFile) {
      let fileIdArray = file.filename.split('.');
      let fileNewName = fileIdArray[0];
      const testeeFileUpdate = await imageFinishWork(fileNewName, 1, {
        user_no: ExclusiveEditDto.user_no,
        user_id: userInfoFromToken.user_id,
        testee_no: ExclusiveEditDto.testee_no,
        reg_time: userInfoFromToken.reg_time,
      });

      updateTesteeData.profile_photo = testeeFileUpdate.image_id;
    }

    //testee,user same update
    try {
      updateTesteeData.nickname = ExclusiveEditDto.nickname;
      updateTesteeData.birthday = ExclusiveEditDto.birthday;
      updateTesteeData.gender = ExclusiveEditDto.gender;
      await this.TesteeRepository.update(
        {
          user_no: ExclusiveEditDto.user_no,
          testee_no: ExclusiveEditDto.testee_no,
        },
        updateTesteeData,
      );
    } catch (e) {
      console.log(e);
    }

    //type = 0 mainuser type=1 testee
    if (type === 0) {
      //testee가 아닌 메인 유저인경우 처리
      console.log(
        'main user..',
        ExclusiveEditDto.user_no,
        ExclusiveEditDto.testee_no,
      );
      if (ExclusiveEditDto.pwd !== undefined && ExclusiveEditDto.pwd !== '') {
        updateTesteeData.pwd = ExclusiveEditDto.pwd;
      }
      updateTesteeData.updt_time = ExclusiveEditDto.updt_time;
      updateTesteeData.updt_datetime = ExclusiveEditDto.updt_datetime;
      try {
        await this.memberRepository.update(
          ExclusiveEditDto.user_no,
          updateTesteeData,
        );
      } catch (e) {
        console.log(e);
      }
    }

    console.log('update OK!!');
    return responseToJson('000');
  }

  async DeleteTesteeMember(body, user): Promise<Object> {
    try {
      await this.TesteeRepository.delete(body);
      //실제 프로필 파일 삭제처리.
    } catch (e) {
      console.log(e);
      return responseToJson('100');
    }
    return responseToJson('000');
  }
}
