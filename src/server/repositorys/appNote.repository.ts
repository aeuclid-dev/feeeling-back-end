import { EntityRepository, Repository } from 'typeorm';

import { TbAppNote as appnote } from '../feelingmodel/entities/TBAppNote';
@EntityRepository(appnote)
export class AppNoteRepository extends Repository<appnote> {}
