import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { CommonService } from './common.service';
import { noticeDto } from '../repositorys/dtos/notice.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiSecurity,
} from '@nestjs/swagger';

@Controller('common')
@ApiTags('공통 API')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get('/text')
  @ApiOperation({
    summary: 'native Text호출 api',
    description: 'native에 표기될 텍스트를 받아옴',
  })
  @ApiCreatedResponse({
    description:
      'usage에 맞는 텍스트 반환\nstart_main,start_bottom,hello,yak1,yak2',
    type: Object,
  })
  GetAppLabel(@Query('usage') usage: string) {
    return this.commonService.GetAppLabel(usage);
  }

  @Get('/notice')
  @ApiOperation({
    summary: '공지사항 api',
    description: '더보기 메뉴의 공지사항을 pos,count에 맞추어 반환함',
  })
  @ApiCreatedResponse({
    description:
      '공지사항 리스트 object return\npublic_posting\npos(page),count(limit)',
    type: Object,
  })
  GetNotice(@Query('count') count: number, @Query('pos') pos: number) {
    const passObj: any = {};
    passObj.pos = pos;
    passObj.count = count;
    return this.commonService.GetAppNotice(passObj);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/alarm')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '알림 api',
    description:
      '상단의 알림을 pos,count에 맞추어 반환함\n요청 및 결과 log형태',
  })
  @ApiCreatedResponse({
    description: '알림 리스트 object return',
    type: Object,
  })
  GetAlarm(
    @Req() req,
    @Query('count') count: number,
    @Query('pos') pos: number,
  ) {
    const passObj: any = {};
    console.log('alarm!@!@');
    console.log(pos);
    console.log(count);
    passObj.pos = pos;
    passObj.count = count;
    return this.commonService.GetAlarm(req.user, passObj);
  }
}
