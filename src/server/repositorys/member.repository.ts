import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, IsNull, Repository } from 'typeorm';
import { JoinMemberDto, loginMemberDto } from './dtos/member.dto';
//import { member } from './member.entity';
import { TbUser as member } from '../feelingmodel/entities/TbUser';
import { hashSync } from 'bcrypt';

@EntityRepository(member)
export class MemberRepository extends Repository<member> {
  async createUser(JoinMemberDto: JoinMemberDto) {
    const {
      user_id,
      pwd,
      sns_id,
      birthday,
      profile_photo,
      mobile,
      gender,
      nickname,
      device_id,
      device_type,
      reg_time,
      reg_datetime,
      updt_time,
      updt_datetime,
      nation,
      type,
    } = JoinMemberDto;
    let user = {};
    if (type === 0) {
      user = this.create({
        user_id,
        pwd,
        birthday,
        profile_photo,
        mobile,
        gender,
        nickname,
        device_id,
        device_type,
        reg_time,
        reg_datetime,
        updt_time,
        updt_datetime,
        nation,
        type,
      });
    } else {
      user = this.create({
        user_id,
        sns_id,
        birthday,
        profile_photo,
        mobile,
        gender,
        nickname,
        device_id,
        device_type,
        reg_time,
        reg_datetime,
        updt_time,
        updt_datetime,
        nation,
        type,
      });
    }
    try {
      const saveData = await this.save(user);
      console.log(saveData);
      return {
        result: true,
        data: saveData,
      };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist userId');
        return {
          result: false,
          error: err.code,
        };
      } else {
        // if(err.code === 'ER_DUP_ENTRY'){
        console.log('got save error > ', err.code);
        console.log(err);
        return {
          result: false,
          error: err.code,
        };
      }
    }
  }

  async updateUser(newValue: object): Promise<void> {
    console.log('in repository');
    console.log(newValue);
    try {
      await this.save(newValue);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist userId');
      } else {
        console.log('got update error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserInfo(myobj: member): Promise<object> {
    const getUserNo = myobj.user_no;

    /**
     * const get_userInfo_with_point_request = await getRepository(member)
      .createQueryBuilder('tb_user')
      .leftJoinAndSelect('tb_user.user_point', 'point')
      .leftJoinAndSelect('tb_user.user_requests', 'tb_request')
      //.loadRelationCountAndMap('tb_user.tb_requests', 'tb_test_result')
      .where('tb_user.user_no = :user_no', { user_no: getUserNo })
      .getOne();
     */
    const get_userInfo_with_point_request = await getRepository(member)
      .createQueryBuilder('tb_user')
      .leftJoinAndSelect('tb_user.user_point', 'point')
      .leftJoinAndSelect('tb_user.user_requests', 'tb_request')
      .leftJoinAndSelect('tb_user.testees', 'tb_testee')
      .where('tb_user.user_no = :user_no', { user_no: getUserNo })
      .getOne();
    //.getQuery();

    console.log(get_userInfo_with_point_request);

    let get_userInfo_sendData: any = {};
    get_userInfo_sendData.user_no = get_userInfo_with_point_request.user_no;
    get_userInfo_sendData.user_id = get_userInfo_with_point_request.user_id;
    get_userInfo_sendData.nickname = get_userInfo_with_point_request.nickname;
    get_userInfo_sendData.type = get_userInfo_with_point_request.type;
    get_userInfo_sendData.profile_photo =
      get_userInfo_with_point_request.profile_photo;
    get_userInfo_sendData.post = get_userInfo_with_point_request.user_requests;
    get_userInfo_sendData.test = get_userInfo_with_point_request.user_requests;
    get_userInfo_sendData.point =
      get_userInfo_with_point_request.user_point !== null
        ? get_userInfo_with_point_request.user_point.total_point
        : 0;

    console.log(get_userInfo_with_point_request.user_point);
    //console.log(get_userInfo_sendData);

    //console.log('this is >> ', get_userPoint);
    return get_userInfo_sendData;
  }
}
