import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  IsNotEmpty,
  isNumber,
  IsArray,
} from 'class-validator';
import { getTimeStampUTC } from '../../common/util';
export class noticeDto {
  @IsString()
  test_req_no: string;
  @IsString()
  notice_status: string;
  @IsNumber()
  user_no: number;
  @IsNumber()
  testee_no: number;
  @IsString()
  image_no: string;
  @IsNotEmpty()
  readonly reg_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  readonly read_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  readonly status: number = 0;
}
