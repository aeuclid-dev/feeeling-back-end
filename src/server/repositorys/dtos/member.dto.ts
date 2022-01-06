import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  IsNotEmpty,
  isNumber,
} from 'class-validator';
import { getTimeStampUTC, getTimeFormatUTC } from '../../common/util';
export class JoinMemberDto {
  @IsString()
  @MinLength(6, {
    message: 'id는 6자 이상이어야합니다.',
  })
  readonly user_id: string;
  @IsOptional()
  @IsString()
  readonly pwd: string;
  @IsOptional()
  @IsNumber()
  readonly sns_id: number;
  @IsString()
  readonly mobile: string;
  @IsString()
  readonly nickname: string;
  @IsNumber()
  readonly gender: number;
  @IsString()
  readonly birthday: string;
  @IsOptional()
  @IsString()
  profile_photo: string;
  @IsString()
  readonly device_id: string;
  @IsNumber()
  readonly device_type: number;
  @IsString()
  readonly nation: string;
  @IsNumber()
  readonly type: number;

  @IsNotEmpty()
  readonly reg_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  readonly reg_datetime: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
  @IsNotEmpty()
  readonly updt_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  readonly updt_datetime: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}

export class existMemberDto {
  @IsString()
  readonly user_id: string;
  @IsNumber()
  readonly type: number;
}

export class loginMemberDto {
  @IsOptional()
  @IsNumber()
  user_no: number;

  @IsOptional()
  @IsString()
  readonly user_id: string;
  @IsOptional()
  @IsString()
  readonly pwd: string;
  @IsNumber()
  readonly type: number;
  @IsString()
  readonly push_token: string;
}

export class testMemberInfoDto {
  @IsNumber()
  testee_no: number;
  @IsNumber()
  user_no: number;
  @IsNumber()
  nickname: string;
  @IsNumber()
  birthday: string;
  @IsNumber()
  gender: number;
  @IsOptional()
  @IsString()
  profile_photo: string;
  @IsNotEmpty()
  readonly reg_time: string = getTimeStampUTC().toString();
  @IsNumber()
  type: number;
}

export class testeeListDto {
  @IsNumber()
  readonly user_no: number;

  // @IsOptional()
}

export class ExclusiveEditDto {
  @IsNumber()
  readonly type: number; //0:user 1:testee
  @IsOptional()
  @IsNumber()
  readonly user_no: number;
  @IsOptional()
  @IsString()
  readonly user_id: string;
  @IsOptional()
  @IsString()
  readonly pwd: string;
  @IsOptional()
  @IsNumber()
  readonly testee_no: number;
  @IsOptional()
  @IsString()
  readonly nickname: string;
  @IsOptional()
  @IsNumber()
  readonly gender: number;
  @IsOptional()
  @IsString()
  readonly birthday: string;
  @IsOptional()
  @IsString()
  profile_photo: string;
  @IsNotEmpty()
  readonly updt_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  readonly updt_datetime: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}
