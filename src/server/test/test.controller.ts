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
import {
  ApiTags,
  ApiOperation,
  ApiSecurity,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('test')
@ApiTags('회원 그림심리검사 API')
export class TestController {
  constructor(private testService: TestService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/testees')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '해당회원의 그린이 리스트 호출 api',
    description: '회원이 등록한 그린이(테스트받는사람) 리스트를 반환',
  })
  @ApiCreatedResponse({
    description:
      '**description output**\n ```\nlist : [\n {\n  testee_no: 테스터번호,\n  nickname:별명,\n  birthday:yyyy-MM-dd,\n  gender:0/1/2,//0:미지정,1:남,2:여 \n },\n{...},\n...\n]\n```',
    type: Object,
  })
  CallTesteesList(@Req() req) {
    return this.testService.CallTesteesList(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/summary')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '해당회원의 Home 스크린 회원 데이터 로드',
    description: '회원의 초기데이터 로드\n',
  })
  @ApiCreatedResponse({
    description:
      '**description output**\n ```\n{\n  user_no: 사용자번호,\n  user_id:사용자 id(이메일),\n  nickname:별명,\n  profile_photo:사용자 프로필 사진 id,\n  post:검사 의뢰한 총 수(검사요청+검사중),test:검사 완료 수(reject 포함)\n  point:사용자 총 포인트 \n}\n```',
    type: Object,
  })
  CallUserSummary(@Req() req) {
    return this.testService.CallUserSummary(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '해당회원의 Home 스크린 검사 데이터 로드',
    description:
      'Home스크린 하단의 이미지 검사 리스트.<br>nickname : 검사한 대상 – 그린이 별명<br>start : 검색 시작 일자 UTC UNIX TIMESTAMP 포맷 (단위: millisecond)end 가 있을 경우엔 반드시 start 도 있어야한다. start/end 모두 있거나 모두 없어야 함<br>end : 검색 종료 일자 UTC UNIX TIMESTAMP 포맷 (단위: millisecond) start 있을 경우에 반드시 end 도  있어야한다. start/end 모두 있거나 모두 없어야 함<br>status : 검사 상태. 키 생략시 전체<br>&nbsp;&nbsp;0: 검사 의뢰 <br>&nbsp;&nbsp;1: 검사 완료<br>pos : 검색 시작 인덱스0 ~<br>count : 검색 요청 갯수 (default:10)',
  })
  @ApiCreatedResponse({
    description:
      '**description output**\n ```\nlist : [\n {\n  test_req_no:검사번호,\n  testee_no: 검사자번호,\n  testee_nickname:별명,\n   test_id:검사유형,\n   image_id:이미지id,\n  test_time:검사 의뢰 시각 UTC UNIX TIMESTAMP 포맷 (단위: millisecond),\n   test_time:검사 의뢰 시각 UTC UNIX TIMESTAMP 포맷 (단위: millisecond),\n   image_comment:이미지설명,\n   status:0/1/2/9,//0:요청,1:검사중,2:검사완료,9:검사거절 \n },\n{...},\n...\n]\n```',
    type: Object,
  })
  CallTestList(
    @Req() req,
    @Query('count') count: number,
    @Query('pos') pos: number,
    @Query('start') start: number,
    @Query('end') end: number,
    @Query('status') status: number,
    @Query('nickname') nickname: string,
  ) {
    const passObj = new testListDto();
    // console.log(req.params); //{}
    // console.log(req.query); //{pos:0,count:3}
    passObj.user_no = req.user.user_no;
    passObj.pos = pos;
    passObj.count = count;
    if (start && end) {
      passObj.start = start;
      passObj.end = end;
    }
    if (status) {
      passObj.status = req.query.status;
    }
    if (nickname) {
      passObj.nickname = req.query.nickname;
    }

    return this.testService.CallTestList(passObj);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/types')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '수행가능한 검사 리스트를 받아옴',
    description: 'table에 use_yn이 y인것만 받아옴.',
  })
  @ApiCreatedResponse({
    description:
      '**description output**\n ```\nlist : [\n {\n  test_id:검사종류번호,\n  test_name: 검사유형,\n  test_desc:검사명,\n },\n{...},\n...\n]\n```',
    type: Object,
  })
  CallTestType(@Req() req) {
    return this.testService.CallTestType();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/questions')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '검사 질문/답변 리스트 요청 API',
    description:
      "test_id: 테스트 id값<br>lang: default :'kr' 다국어인경우 쿼리도 변경필요.",
  })
  @ApiCreatedResponse({
    description:
      '**description output**\n ```\nlist : [\n {\n	"test_id":검사유형번호,\n		"question_no":"1",\n		"order_no":"1",\n		"question":"그림을 다 그리는데 걸리는 시간은?",\n		"answers":[\n			{\n				"answer_no":"1",\n				"question_no":"1",\n				"order_no":"1",\n				"answer":" 5분",\n				"type":"0,\n			},\n			{\n				"answer_no":"2",\n				"question_no":"1",\n				"order_no":"2",\n				"answer":"기타",\n				"type":"1,\n			},\n			{...},\n			...\n		]\n	},\n	{\n		"test_id":검사유형번호,\n		"question_no":"2",\n		"order_no":"2",\n		"question":"누구의 집인가?",\n		"answers":[\n			{\n				"answer_no":"2",\n				"question_no":"2",\n				"order_no":"1",\n				"answer":"부모님",\n				"type":"0,\n			},\n			{\n				"answer_no":"2",\n				"question_no":"2",\n				"order_no":"2",\n				"answer":"기타",\n				"type":"1,\n			},\n			{...},\n			...\n		]\n	},\n	{...},\n	...\n]\n```',
    type: Object,
  })
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
  @ApiSecurity('token')
  @ApiOperation({
    summary: '검사대상자(testee) 추가 API',
    description:
      '<br>nickname : 그린이(피검사자-testee) 별명/이름<br>birthday : 그린이(피검사자-testee) 생년월일<br>gender : 성별<br>&nbsp;&nbsp;1: 남자<br>&nbsp;&nbsp;2: 여자<br>file : 프로필이미지',
  })
  @ApiCreatedResponse({
    description:
      '**description output**\n ```\n{\n  testee_no:추가된 검사대상자 번호,\n }\n```',
    type: Object,
  })
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
  @ApiSecurity('token')
  @ApiOperation({
    summary: '검사이미지 보정 API',
    description:
      'file: 검사 이미지<br>보정후 이미지 저장후 리턴 (보정기능 미사용중)',
  })
  @ApiCreatedResponse({
    description:
      '헤더에는 result object(status,message) body에는 image binary string return',
    type: String,
  })
  TestFileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Response() res: Res,
  ) {
    return this.testService.TestFileUpload(file, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/request')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '검사의뢰 요청 API',
    description:
      '**description input**\n ```\n{\n	"test_id":"검사유형번호",\n	"testee_no":"피검사자(그린이) 번호",\n	"test_questions" : [\n		{\n			"question_no":1,\n			"answer_no":2,\n			"answer":"주관식답변"	//답변이 주관식인경우. default는 ""\n		},\n		{\n			"question_no":2,\n			"answer_no":3,\n			"answer":"주관식답변"\n		},\n		{...},\n		...\n	],\n	"correct_image_id":"보정된 이미지 id",\n	"image_comment":"이미지 설명"\n}\n```',
  })
  @ApiCreatedResponse({
    description: '검사의뢰 요청 result return',
    type: Object,
  })
  RequestTest(@Req() req, @Body() body: object) {
    return this.testService.RequestTest(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/result')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '검사완료데이터 요청 API',
    description: 'test_req_no: test번호',
  })
  @ApiCreatedResponse({
    description: 'test_result_all 참조',
    type: Object,
  })
  getTestResult(@Req() req, @Body() body: object) {
    return this.testService.getTestResult(req.user, body);
  }
}
