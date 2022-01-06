import { EntityRepository, Repository } from 'typeorm';
import { TbTestScore as score } from '../feelingmodel/entities/TbTestScore';

@EntityRepository(score)
export class TestScoreRepository extends Repository<score> {}
