import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberRepository } from '../repositorys/member.repository';
import { TesteeRepository } from '../repositorys/testee.repository';
import { member } from './member.entity';
import { MemberService } from './member.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberRepository, TesteeRepository]),
    AuthModule,
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
