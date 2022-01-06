import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { CommonService } from './common.service';
import { noticeDto } from '../repositorys/dtos/notice.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Get('/text')
  GetAppLabel(@Query('usage') usage: string) {
    //console.log('call text');
    return this.commonService.GetAppLabel(usage);
  }

  @Get('/notice')
  GetNotice(@Req() req) {
    //console.log('call-notice');
    const passObj: any = {};
    passObj.pos = req.query.pos;
    passObj.count = req.query.count;
    // if ('start' in req.query && 'end' in req.query) {
    //   passObj.start = req.query.start;
    //   passObj.end = req.query.end;
    // }
    // if ('status' in req.query) {
    //   passObj.status = req.query.status;
    // }
    return this.commonService.GetAppNotice(passObj);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/alarm')
  GetAlarm(@Req() req) {
    //console.log('call-alarm');
    const passObj: any = {};
    passObj.pos = req.query.pos;
    passObj.count = req.query.count;

    return this.commonService.GetAlarm(req.user, passObj);
  }
}
