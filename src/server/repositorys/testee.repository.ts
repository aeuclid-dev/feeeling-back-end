import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TbTestee as testee } from '../feelingmodel/entities/TbTestee';
import { TbTest as test } from '../feelingmodel/entities/TbTest';
import { testMemberInfoDto } from '../repositorys/dtos/member.dto';

@EntityRepository(testee)
export class TesteeRepository extends Repository<testee> {
  async createTesteeUser(testMemberInfoDto: testMemberInfoDto) {
    const { user_no, nickname, birthday, gender, reg_time, type } =
      testMemberInfoDto;
    let testee = this.create({
      user_no,
      nickname,
      birthday,
      gender,
      reg_time,
      type,
    });
    let resultData;

    try {
      resultData = await this.save(testee);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist userId');
      } else {
        console.log('got save error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
    return Object.assign({}, resultData);
  }

  async updateUser(newValue: object): Promise<void> {
    console.log('in repository');
    console.log(newValue);
    try {
      await this.save(newValue);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('exist userId');
      } else {
        console.log('got update error > ', err.code);
        console.log(err);
        throw new InternalServerErrorException();
      }
    }
  }
}

@EntityRepository(test)
export class TestRepository extends Repository<test> {}
