import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '../repositorys/admin.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
