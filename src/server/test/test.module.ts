import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MemberRepository } from '../repositorys/member.repository';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestRequestRepository } from '../repositorys/test.repository';
import { TestQuestionRepository } from '../repositorys/question.reporitory';
import { ImageRepository } from '../repositorys/image.repository';
import { AnswerRepository } from '../repositorys/answer.repository';
import { TestResultAllRepository } from '../repositorys/testResultAll.repository';
import { NoticeRepository } from '../repositorys/notice.repository';

import {
  TesteeRepository,
  TestRepository,
} from '../repositorys/testee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberRepository,
      TesteeRepository,
      TestRepository,
      TestRequestRepository,
      TestQuestionRepository,
      ImageRepository,
      AnswerRepository,
      TestResultAllRepository,
      NoticeRepository,
    ]),
    AuthModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
