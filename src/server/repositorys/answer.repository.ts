import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, IsNull, Repository } from 'typeorm';
import { TbUserTestAnswer as utAnswer } from '../feelingmodel/entities/TbUserTestAnswer';
import { AnswerDto } from './dtos/answer.dto';
@EntityRepository(utAnswer)
export class AnswerRepository extends Repository<utAnswer> {
  async createUserTestAnswer(AnswerDto: AnswerDto): Promise<boolean> {
    const {
      test_req_no,
      user_no,
      test_id,
      question_no,
      answer_no,
      answer,
      reg_time,
    } = AnswerDto;
    const result = this.create({
      test_req_no,
      user_no,
      test_id,
      question_no,
      answer_no,
      answer,
      reg_time,
    });

    try {
      await this.save(result);
      return true;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist sameImage');
      } else {
        console.log('got save error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
      return false;
    }
  }
}
