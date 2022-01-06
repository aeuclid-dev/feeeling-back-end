import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbStat as stat } from '../feelingmodel/entities/TbStat';

@EntityRepository(stat)
export class StatRepository extends Repository<stat> {}
