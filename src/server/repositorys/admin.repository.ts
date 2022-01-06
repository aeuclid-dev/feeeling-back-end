import { EntityRepository, Repository } from 'typeorm';
import { TbAdmin as admin } from '../feelingmodel/entities/TbAdmin';

@EntityRepository(admin)
export class AdminRepository extends Repository<admin> {}
