import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbStatClass as statclass } from '../feelingmodel/entities/TbStatClass';

@EntityRepository(statclass)
export class StatClassRepository extends Repository<statclass> {}
