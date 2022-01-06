import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { TbUser } from '../feelingmodel/entities/TbUser';
import { testListDto } from '../repositorys/dtos/test.dto';
//import { Request } from 'express';
import { TestService } from './test.service';
import { multerOptions } from '../lib/multerOptions';
import { Express, Response as Res } from 'express';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/testees')
  CallTesteesList(@Req() req) {
    return this.testService.CallTesteesList(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/summary')
  CallUserSummary(@Req() req) {
    return this.testService.CallUserSummary(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  CallTestList(@Req() req) {
    const passObj = new testListDto();
    // console.log(req.params); //{}
    // console.log(req.query); //{pos:0,count:3}
    passObj.user_no = req.user.user_no;
    passObj.pos = req.query.pos;
    passObj.count = req.query.count;
    if ('start' in req.query && 'end' in req.query) {
      passObj.start = req.query.start;
      passObj.end = req.query.end;
    }
    if ('status' in req.query) {
      passObj.status = req.query.status;
    }
    if ('nickname' in req.query) {
      passObj.nickname = req.query.nickname;
    }

    return this.testService.CallTestList(passObj);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/types')
  CallTestType(@Req() req) {
    return this.testService.CallTestType();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/questions')
  CallTestQuestion(
    @Query('test_id') test_id: string,
    @Query('lang') lang: string,
  ) {
    const getParams = {
      test_id: test_id,
      lang: lang,
    };
    //console.log(getParams);
    return this.testService.CallTestQuestion(getParams);
  }

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @UseGuards(AuthGuard('jwt'))
  @Post('/testee/new')
  CallAddTestee(
    @Req() req,
    @Body() body: object,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.testService.CallAddTestee(req.user.user_no, body, file);
  }

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @UseGuards(AuthGuard('jwt'))
  @Post('/image/correct')
  TestFileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Response() res: Res,
  ) {
    return this.testService.TestFileUpload(file, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/request')
  RequestTest(@Req() req, @Body() body: object) {
    return this.testService.RequestTest(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/result')
  getTestResult(@Req() req, @Body() body: object) {
    return this.testService.getTestResult(req.user, body);
  }
}
