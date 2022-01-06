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
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/test')
  test() {
    //console.log('call test');
    //console.log(new Date().getTime());
    getTimeStampUTC();
    return null;
  }

  @Get('/exist?')
  getExistCheck(@Query('id') user_id: string, @Query('type') type: number) {
    //browser로 호출했을경우에는 응답하나 axios로 콜한경우 응답안함. 이부분 확실하게 체크필요.
    //console.log('call???');
    //console.log(`member! Controller exist check id:${user_id} , type:${type}`);
    return this.memberService.getExistCheck(user_id, type);
  }

  @Post('/login')
  LoginMember(@Body() loginMemberDto: loginMemberDto) {
    //console.log('call login member');
    return this.memberService.loginMember(loginMemberDto);
  }

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Post('/new')
  JoinMember(
    @UploadedFile() file: Express.Multer.File,
    @Body() JoinMemberDto: JoinMemberDto,
  ) {
    //console.log('call join member');
    return this.memberService.newMember(JoinMemberDto, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  LogoutMember(@Req() req) {
    return this.memberService.LogoutMember(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/push')
  TokenRenewal(@Req() req, @Body() body: object) {
    return this.memberService.TokenRenewal(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
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
  DeleteTesteeMember(@Body() body, @Req() req) {
    return this.memberService.DeleteTesteeMember(body, req.user);
  }
}
