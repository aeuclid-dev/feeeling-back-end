import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbTestRequest as test_request } from '../feelingmodel/entities/TbTestRequest';
import { TbQuestion as question } from '../feelingmodel/entities/TbQuestion';

@EntityRepository(question)
export class TestQuestionRepository extends Repository<test_request> {
  async getQuestionLists(myobj): Promise<object> {
    const quesion_id = myobj.test_id;

    const get_user_test_list = await getRepository(question)
      .createQueryBuilder('tb_question')
      .leftJoinAndSelect('tb_question.answers', 'tb_answer')
      .where('tb_question.test_id = :test_id', { test_id: quesion_id })
      .getMany();
    return get_user_test_list;
  }
}
