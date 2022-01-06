import { EntityRepository, Repository } from 'typeorm';

import { TbAdminCheckedTest as adminCheckTest } from '../feelingmodel/entities/TbAdminCheckedTest';

@EntityRepository(adminCheckTest)
export class AdminCheckedTestRepository extends Repository<adminCheckTest> {}
