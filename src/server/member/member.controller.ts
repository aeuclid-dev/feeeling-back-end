import {
  Controller,
  Get,
  Query,
  HttpStatus,
  Post,
  Body,
  Response,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { member } from './member.entity';
import {
  existMemberDto,
  JoinMemberDto,
  loginMemberDto,
  ExclusiveEditDto,
} from '../repositorys/dtos/member.dto';
import { MemberService } from './member.service';
import { getTimeStampUTC } from '../common/util';
import { AuthGuard } from '@nestjs/passport';
import { multerOptions } from '../lib/multerOptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response as Res } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiSecurity,
  ApiBody,
} from '@nestjs/swagger';
/**
 * @UseGuards(AuthGuard('local'))
  @Post('/User/Login')
  public async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    this.authService
      .login(dto)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json(ResponseBody.createResponseBody().setBody(result));
      })
      .catch((e) => {
        console.log(e);
        res
          .status(HttpStatus.OK)
          .json(
            ResponseBody.createResponseBody()
              .setResultCode(RESULT_CODE.ERROR_BUT_IGNORED)
              .setErrorCode(ERROR_CODE.DB_DATA_NOT_FOUND)
              .setErrorDesc(e),
          );
      });
  }
 */

@Controller('member')
@ApiTags('유저 API')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/exist?')
  @ApiOperation({
    summary: '유저확인API',
    description:
      'sns가입일때 유저여부를 체크\nuser_id:String,\ntype:number //0:일반,1:카카오,2:네이버',
  })
  @ApiCreatedResponse({
    description:
      'sns가입일때 유저여부를 체크.\nis_exist:\n  0:존재하지않음\n  1:존재함',
    type: Object,
  })
  getExistCheck(@Query('id') user_id: string, @Query('type') type: number) {
    // "is_exist":number
    //   "result":object{
    //     "status":number,
    //       "message":string
    //     }
    //   }
    return this.memberService.getExistCheck(user_id, type);
  }

  @Post('/login')
  @ApiBody({ type: loginMemberDto })
  @ApiOperation({
    summary: '유저로그인API',
    description:
      'type이 0인경우 user_id,pwd 체크<br>type이 1,2인경우 user_id는 해당 sns에서 받은 id값(number)',
  })
  @ApiCreatedResponse({
    description: '유저 로그인 api\ntoken:tokenvalue',
    type: Object,
  })
  LoginMember(@Body() loginMemberDto: loginMemberDto) {
    //console.log('call login member');
    return this.memberService.loginMember(loginMemberDto);
  }

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Post('/new')
  @ApiBody({ type: JoinMemberDto })
  @ApiOperation({
    summary: '유저 가입API',
    description: 'file은 선택사항.\n그 이외에는 required',
  })
  @ApiCreatedResponse({
    description: '유저 가입 api 성공시 result 반환',
    type: JoinMemberDto,
  })
  JoinMember(
    @UploadedFile() file: Express.Multer.File,
    @Body() JoinMemberDto: JoinMemberDto,
  ) {
    //console.log('call join member');
    return this.memberService.newMember(JoinMemberDto, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '유저로그아웃API',
    description: '유저로그아웃 api - auth_token, push_token 삭제처리.',
  })
  @ApiCreatedResponse({
    description: '유저로그아웃api 성공시 result 반환',
    type: Object,
  })
  LogoutMember(@Req() req) {
    return this.memberService.LogoutMember(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/push')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '유저 pushtoken update api',
    description: 'new token send & update',
  })
  @ApiCreatedResponse({
    description: '유저 토큰갱신처리 성공시 result 반환',
    type: Object,
  })
  TokenRenewal(@Req() req, @Body() body: object) {
    return this.memberService.TokenRenewal(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiSecurity('token')
  @ApiBody({ type: ExclusiveEditDto })
  @ApiOperation({
    summary: '유저수정api',
    description: '해당 testee를 수정',
  })
  @ApiCreatedResponse({
    description: '수정결과 result 반환',
    type: Object,
  })
  @Post('/editUser')
  EditMember(
    @UploadedFile() file: Express.Multer.File,
    @Body() ExclusiveEditDto: ExclusiveEditDto,
    @Req() req,
  ) {
    //console.log('call editUser!!!!');
    //console.log(ExclusiveEditDto);

    return this.memberService.EditMember(ExclusiveEditDto, file, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/deleteUser')
  @ApiSecurity('token')
  @ApiOperation({
    summary: '유저삭제 api',
    description: '해당 testee를 삭제처리',
  })
  @ApiCreatedResponse({
    description: '삭제결과 result 반환',
    type: Object,
  })
  DeleteTesteeMember(@Body() body, @Req() req) {
    return this.memberService.DeleteTesteeMember(body, req.user);
  }
}
