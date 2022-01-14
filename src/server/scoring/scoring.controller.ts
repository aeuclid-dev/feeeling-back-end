import {
  Controller,
  Post,
  Get,
  Query,
  Req,
  UseGuards,
  Body,
  Render,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { ScoringService } from './scoring.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('scoring')
@ApiTags('admin scoring API')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/scoringInitdata')
  @ApiOperation({
    summary: 'scoring 초기 데이터 api',
    description: '초기페이지에서 필요한 데이터를 로드',
  })
  @ApiCreatedResponse({
    description: '해당 사용자의 기록을 object형태로 받아옴',
    type: Object,
  })
  async scoringInitData(@Query('date') date: number, @Req() req, @Res() res) {
    console.log('call scoring Initdata');
    console.log(req.user);
    const returnData = await this.scoringService.ScoringInitData(
      date,
      req.user,
    );
    return res.status(201).send(returnData);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/requestTest')
  async RequestTestData(@Req() req, @Res() res) {
    //console.log('scoring/requestTest get request!!33');
    const returnData = await this.scoringService.RequestTestData(req.user);
    return res.status(201).send(returnData);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/requestQuestion?')
  async RequestTestQuestion(
    @Req() req,
    @Query('test_id') test_id: number,
    @Res() res,
  ) {
    const returnData = await this.scoringService.RequestTestQuestion(test_id);
    return res.status(201).send(returnData);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/rejectTestReq')
  async RejectTestRequest(@Req() req, @Body() body, @Res() res) {
    const returnData = await this.scoringService.RejectTestRequest(
      req.user,
      body,
    );
    return res.status(201).send(returnData);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/finish')
  async finishData(@Req() req, @Body() body, @Res() res) {
    /**
     *  test Request info 에 있는 데이터로 어떤 테스트인지 확인하고
     *  다른로직을 통해 저장되기때문에 서비스를 나눠서 쓰도록함.
     *  test_category: "DRAWING"
     *  test_desc: "빗속의 사람"
     *  test_id: 100
     *  test_name: "PITR"
     */
    let returnData;

    switch (body.testRequestInfo.test_id) {
      case 100:
        returnData = await this.scoringService.finishDataPITR(req.user, body);
        break; //pitr
      case 101:
        returnData = await this.scoringService.finishDataPITR(req.user, body);
        break; //house
      case 102:
        returnData = await this.scoringService.finishDataPITR(req.user, body);
        break; //tree
      case 103:
        returnData = await this.scoringService.finishDataPITR(req.user, body);
        break; //man
      case 104:
        returnData = await this.scoringService.finishDataPITR(req.user, body);
        break; //woman
      default:
        returnData = null;
    }
    return res.status(201).send(returnData);
  }

  @Post('/pushtest')
  @HttpCode(HttpStatus.OK)
  pushTest() {
    return this.scoringService.pushtest();
  }
}
