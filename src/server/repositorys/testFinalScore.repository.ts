import { EntityRepository, Repository } from 'typeorm';
import { TbTestFinalScore as finalScore } from '../feelingmodel/entities/TbTestFinalScore';

@EntityRepository(finalScore)
export class TestFinalScoreRepository extends Repository<finalScore> {}
