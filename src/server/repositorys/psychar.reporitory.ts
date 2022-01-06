import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbPsyChar as char } from '../feelingmodel/entities/TbPsyChar';

@EntityRepository(char)
export class PsyCharRepository extends Repository<char> {}
