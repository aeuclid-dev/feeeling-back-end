import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { testRequestDto, testListDto } from './dtos/test.dto';
import { TbTestRequest as test_request } from '../feelingmodel/entities/TbTestRequest';
import { TbUser as member } from '../feelingmodel/entities/TbUser';
import { TbQuestion as question } from '../feelingmodel/entities/TbQuestion';
import { TbAnswer as answer } from '../feelingmodel/entities/TbAnswer';
import { TbTestee as testee } from '../feelingmodel/entities/TbTestee';

@EntityRepository(test_request)
export class TestRequestRepository extends Repository<test_request> {
  async getTestLists(myobj: testListDto): Promise<object> {
    console.log('----------------------get test lists---------------------');
    console.log(myobj);
    const get_user_test_list = await getRepository(test_request)
      .createQueryBuilder('tb_test_request')
      .leftJoinAndSelect('tb_test_request.linkimage', 'tb_image')
      .leftJoinAndSelect('tb_test_request.testeeinfo', 'tb_testee')
      .leftJoinAndSelect('tb_test_request.test_result', 'tb_test_result')
      .select([
        'tb_test_request.test_req_no as test_req_no',
        'tb_test_request.testee_no as testee_no',
        'tb_test_request.test_id as test_id',
        'tb_test_request.test_time as test_time',
        'tb_test_request.status as status',
        'tb_test_result.result_time as result_time',
        'tb_testee.nickname as testee_nickname',
        'tb_image.image_id as image_id',
        'tb_image.image_comment as image_comment',
      ]) // added selection
      .where('tb_test_request.user_no = :user_no', { user_no: myobj.user_no });

    if (myobj.nickname !== undefined && myobj.nickname !== '') {
      get_user_test_list.andWhere('tb_testee.nickname = :nickname', {
        nickname: myobj.nickname,
      });
    }

    if (
      myobj.start !== undefined &&
      myobj.start > 0 &&
      myobj.end !== undefined &&
      myobj.end > 0
    ) {
      get_user_test_list.andWhere(
        'tb_test_request.test_time BETWEEN :start AND :end',
        { start: myobj.start, end: myobj.end },
      );
    }

    if (
      myobj.status !== undefined &&
      (myobj.status === 0 || myobj.status === 1)
    ) {
      get_user_test_list.andWhere('tb_test_request.status = :status', {
        nickname: myobj.status,
      });
    }
    get_user_test_list
      .orderBy('tb_test_request.test_time', 'DESC')
      .limit(myobj.count)
      .offset(myobj.pos);

    return get_user_test_list.getRawMany();
  }

  async createTestRequestData(
    testRequestDto: testRequestDto,
  ): Promise<testRequestDto> {
    const {
      user_no,
      user_id,
      test_id,
      testee_no,
      test_question,
      image_no,
      test_time,
      status,
    } = testRequestDto;
    console.log('testRequestRepository / createTestRequestData');
    console.log(typeof test_question);
    console.log(test_question);
    let userRequestData = this.create({
      user_no,
      user_id,
      test_id,
      testee_no,
      test_question,
      image_no,
      test_time,
      status,
    });

    try {
      const resultData = await this.save(userRequestData);
      return resultData;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist userId');
      } else {
        console.log('got save error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }

  async getAdminRequestTest(test_req_no?: number): Promise<object> {
    const get_user_request_test = await getRepository(test_request)
      .createQueryBuilder('tb_test_request')
      .leftJoinAndSelect('tb_test_request.linkimage', 'tb_image')
      .leftJoinAndSelect('tb_test_request.linktestname', 'tb_test')
      .leftJoinAndSelect('tb_test_request.testeeinfo', 'tb_testee')
      .select([
        'tb_test_request.test_req_no as test_req_no',
        'tb_test_request.testee_no as testee_no',
        'tb_test_request.test_id as test_id',
        'tb_test_request.test_time as test_time',
        'tb_test_request.status as status',
        'tb_image.image_id as image_id',
        'tb_image.image_no as image_no',
        'tb_testee.*',
        'tb_test.*',
      ]);

    if (test_req_no !== undefined && test_req_no !== null && test_req_no > 0) {
      console.log('test repository got test_req_no!! ', test_req_no);
      get_user_request_test.where('tb_test_request.status = :state', {
        state: 1,
      });
      get_user_request_test.andWhere('tb_test_request.test_req_no = :trn', {
        trn: test_req_no,
      });
    } else {
      console.log('test repository no send new test_req..');
      get_user_request_test.where('tb_test_request.status = :state', {
        state: 0,
      });
    }
    get_user_request_test.orderBy('tb_test_request.test_time', 'ASC');

    return get_user_request_test.getRawOne();
  }
}
