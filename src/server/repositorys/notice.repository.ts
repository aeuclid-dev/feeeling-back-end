import { EntityRepository, Repository } from 'typeorm';
import { TbNotice as notice } from '../feelingmodel/entities/TbNotice';

@EntityRepository(notice)
export class NoticeRepository extends Repository<notice> {}
