import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageDownloadModule } from './image-download/image-download.module';
import { MemberModule } from './member/member.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import connectionOption from './configs/typeorm.config';
//after add next
import Next from 'next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { MyRenderOption } from './configs/renderOptions';
import { ScoringModule } from './scoring/scoring.module';
import { ViewModule } from './view/view.module';
import { TestRequestRepository } from './repositorys/test.repository';

@Module({
  imports: [
    ViewModule,
    TypeOrmModule.forRoot(connectionOption),
    ImageDownloadModule,
    MemberModule,
    TestModule,
    AuthModule,
    CommonModule,
    AdminModule,
    ScoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
