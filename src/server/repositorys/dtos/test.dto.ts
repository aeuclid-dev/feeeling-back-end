import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  IsNotEmpty,
  isNumber,
  IsArray,
} from 'class-validator';
import { getTimeStampUTC, getTimeFormatUTC } from '../../common/util';
export class testRequestDto {
  @IsNumber()
  user_no: number;
  @IsString()
  user_id: string;
  @IsNumber()
  test_id: number;
  @IsNumber()
  testee_no: number;
  @IsString()
  test_question: string;
  @IsString()
  image_no: string;
  @IsNotEmpty()
  readonly test_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  @IsNumber()
  status: number = 0;
}

export class testListDto {
  @IsNumber()
  user_no: number;
  @IsOptional()
  @IsString()
  nickname: string;
  @IsOptional()
  @IsNumber()
  start: number;
  @IsOptional()
  @IsNumber()
  end: number;
  @IsOptional()
  @IsNumber()
  status: number;
  @IsNotEmpty()
  @IsNumber()
  pos: number = 0;
  @IsNotEmpty()
  @IsNumber()
  count: number = 3;
}
