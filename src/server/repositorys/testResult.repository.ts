import { EntityRepository, Repository } from 'typeorm';
import { TbTestResult as testResult } from '../feelingmodel/entities/TbTestResult';

@EntityRepository(testResult)
export class TestResultRepository extends Repository<testResult> {}
