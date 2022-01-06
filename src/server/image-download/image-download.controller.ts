import {
  Controller,
  Query,
  Req,
  UseGuards,
  Response,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Express, Response as Res } from 'express';
import { ImageDownloadService } from './image-download.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('image')
export class ImageDownloadController {
  constructor(private ImageDownloadService: ImageDownloadService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  GetImageFile(
    @Req() req,
    @Query('type') type: number,
    @Query('image_id') image_id: string,
    @Query('size') size: number,
    @Response() res: Res,
  ) {
    console.log('call getImageFiles');
    const fileInfo = {
      type,
      image_id,
      size,
    };
    return this.ImageDownloadService.GetImageFile(req.user, fileInfo, res);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/adminScroingImage')
  GetImageFileFromAdmin(
    @Req() req,
    @Query('type') type: number,
    @Query('image_id') image_id: string,
    @Query('size') size: number,
    @Response() res: Res,
  ) {
    console.log('call getImageFiles');
    const fileInfo = {
      type,
      image_id,
      size,
    };
    return this.ImageDownloadService.GetImageFile(req.user, fileInfo, res);
  }
}
