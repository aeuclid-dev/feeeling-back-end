import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { getTimeStampUTC, getTimeFormatUTC } from '../../common/util';
export class AnswerDto {
  @IsOptional()
  @IsNumber()
  readonly user_answer_no: number;
  @IsString()
  test_req_no: string;
  @IsNumber()
  user_no: number;
  @IsNumber()
  test_id: number;
  @IsNumber()
  question_no: number;
  @IsNumber()
  answer_no: number;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  answer: string = '';
  @IsNotEmpty()
  readonly reg_time: string = getTimeStampUTC().toString();
}
