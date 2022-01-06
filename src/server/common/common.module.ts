import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppNoteRepository } from '../repositorys/appNote.repository';
import { PublicPostingRepository } from '../repositorys/publicPosting.repository';
import { NoticeRepository } from '../repositorys/notice.repository';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppNoteRepository,
      PublicPostingRepository,
      NoticeRepository,
    ]),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
