import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ScoringController } from './scoring.controller';
import { ScoringService } from './scoring.service';
import { TestRequestRepository } from '../repositorys/test.repository';
import { PsyCheckRepository } from '../repositorys/psycheck.reporitory';
import { AdminCheckedTestRepository } from '../repositorys/adminCheckedTest.repository';
import { TestScoreRepository } from '../repositorys/testScore.repository';
import { TestFinalScoreRepository } from '../repositorys/testFinalScore.repository';
import { PsyCharRepository } from '../repositorys/psychar.reporitory';
import { PsyItemRepository } from '../repositorys/psyitem.reporitory';
import { PsyNoteRepository } from '../repositorys/psynote.reporitory';
import { StatClassRepository } from '../repositorys/statClass.reporitory';
import { StatRepository } from '../repositorys/stat.reporitory';
import { MemberRepository } from '../repositorys/member.repository';
import { TestResultAllRepository } from '../repositorys/testResultAll.repository';
import { TestResultRepository } from '../repositorys/testResult.repository';
import { NoticeRepository } from '../repositorys/notice.repository';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      TestRequestRepository,
      PsyCheckRepository,
      AdminCheckedTestRepository,
      TestScoreRepository,
      TestFinalScoreRepository,
      PsyCharRepository,
      PsyItemRepository,
      PsyNoteRepository,
      StatClassRepository,
      StatRepository,
      MemberRepository,
      TestResultAllRepository,
      TestResultRepository,
      NoticeRepository,
    ]),
  ],
  controllers: [ScoringController],
  providers: [ScoringService],
})
export class ScoringModule {}
