import { EntityRepository, Repository } from 'typeorm';
import { TbTestResultAll as testResultAll } from '../feelingmodel/entities/TbTestResultAll';

@EntityRepository(testResultAll)
export class TestResultAllRepository extends Repository<testResultAll> {}
