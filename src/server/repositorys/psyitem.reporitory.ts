import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbPsyItem as item } from '../feelingmodel/entities/TbPsyItem';

@EntityRepository(item)
export class PsyItemRepository extends Repository<item> {}
