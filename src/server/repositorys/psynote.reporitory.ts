import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbPsyNote as note } from '../feelingmodel/entities/TbPsyNote';

@EntityRepository(note)
export class PsyNoteRepository extends Repository<note> {}
