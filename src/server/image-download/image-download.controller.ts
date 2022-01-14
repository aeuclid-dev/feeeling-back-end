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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiSecurity,
} from '@nestjs/swagger';

@Controller('image')
@ApiTags('image API')
export class ImageDownloadController {
  constructor(private ImageDownloadService: ImageDownloadService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '이미지 요청 api',
    description:
      '토큰과 함께 필요한 이미지를 요청받고 확인하여 돌려줌<br>type : 이미지타입<br>&nbsp;&nbsp;0 : 검사이미지<br>&nbsp;&nbsp;1 : 프로필이미지<br>&nbsp;&nbsp;2 : 리소스이미지<br>&nbsp;&nbsp;3 : testee프로필이미지<br>image_id : 이미지ID<br>size : 0:썸네일,1:원본',
  })
  @ApiCreatedResponse({
    description: 'image binary data',
    type: String,
  })
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
  @ApiSecurity('token')
  @ApiOperation({
    summary: '관리자 이미지 요청 api',
    description:
      '관리자페이지에서 검사요청된 건에 대한 이미지를 전송<br>위의 api와 동일하나 useGuard의 사용방식이 다름<br>type : 이미지타입<br>&nbsp;&nbsp;0 : 검사이미지<br>&nbsp;&nbsp;1 : 프로필이미지<br>&nbsp;&nbsp;2 : 리소스이미지<br>&nbsp;&nbsp;3 : testee프로필이미지<br>image_id : 이미지ID<br>size : 0:썸네일,1:원본',
  })
  @ApiCreatedResponse({
    description: 'image binary data',
    type: String,
  })
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
