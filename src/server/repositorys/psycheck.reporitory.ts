import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbPsyCheck as check } from '../feelingmodel/entities/TbPsyCheck';

import { TbTestRequest as test_request } from '../feelingmodel/entities/TbTestRequest';
import { TbQuestion as question } from '../feelingmodel/entities/TbQuestion';

@EntityRepository(check)
export class PsyCheckRepository extends Repository<test_request> {
  async getPsyCheckLists(test_id: number): Promise<object> {
    const get_score_list = await getRepository(check)
      .createQueryBuilder('tb_psy_check')
      .leftJoinAndSelect('tb_psy_check.checkScore', 'tb_psy_check_score')
      .where('tb_psy_check.test_id = :test_id', { test_id: test_id })
      .orderBy({
        'tb_psy_check.check_category_seq': 'ASC',
        'tb_psy_check.check_seq': 'ASC',
      })
      .getMany();

    //console.log(get_score_list);
    return get_score_list;
  }
}
