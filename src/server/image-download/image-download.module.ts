import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageDownloadController } from './image-download.controller';
import { ImageDownloadService } from './image-download.service';
import { ImageRepository } from '../repositorys/image.repository';
import { AuthModule } from '../auth/auth.module';
import { TesteeRepository } from '../repositorys/testee.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageRepository, TesteeRepository]),
    AuthModule,
  ],
  controllers: [ImageDownloadController],
  providers: [ImageDownloadService],
})
export class ImageDownloadModule {}
