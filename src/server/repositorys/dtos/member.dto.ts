import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  IsNotEmpty,
  isNumber,
} from 'class-validator';
import { getTimeStampUTC, getTimeFormatUTC } from '../../common/util';
import { ApiProperty } from '@nestjs/swagger';

export class JoinMemberDto {
  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: 'id는 6자 이상이어야합니다.',
  })
  readonly user_id: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly pwd: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly sns_id: number;
  @ApiProperty()
  @IsString()
  readonly mobile: string;
  @ApiProperty()
  @IsString()
  readonly nickname: string;
  @ApiProperty()
  @IsNumber()
  readonly gender: number;
  @ApiProperty()
  @IsString()
  readonly birthday: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  profile_photo: string;
  @ApiProperty()
  @IsString()
  readonly device_id: string;
  @ApiProperty()
  @IsNumber()
  readonly device_type: number;
  @ApiProperty()
  @IsString()
  readonly nation: string;
  @ApiProperty()
  @IsNumber()
  readonly type: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly reg_time: string = getTimeStampUTC().toString();
  @ApiProperty()
  @IsNotEmpty()
  readonly reg_datetime: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
  @ApiProperty()
  @IsNotEmpty()
  readonly updt_time: string = getTimeStampUTC().toString();
  @ApiProperty()
  @IsNotEmpty()
  readonly updt_datetime: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}

export class existMemberDto {
  @IsString()
  @ApiProperty({ description: 'id' })
  readonly user_id: string;
  @IsNumber()
  readonly type: number;
}

export class loginMemberDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  user_no: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly user_id: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly pwd: string;
  @ApiProperty()
  @IsNumber()
  readonly type: number;
  @ApiProperty()
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
  @ApiProperty()
  @IsNumber()
  readonly type: number; //0:user 1:testee
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly user_no: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly user_id: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly pwd: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly testee_no: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly nickname: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly gender: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly birthday: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  profile_photo: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly updt_time: string = getTimeStampUTC().toString();
  @ApiProperty()
  @IsNotEmpty()
  readonly updt_datetime: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}
