import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { getTimeStampUTC, getTimeFormatUTC } from '../../common/util';
export class ImageDto {
  @IsOptional()
  @IsNumber()
  readonly image_no: number;
  @IsString()
  image_id: string;
  @IsOptional()
  @IsString()
  image_comment: string;
  @IsNumber()
  testee_no: number;
  @IsNotEmpty()
  readonly reg_time: string = getTimeStampUTC().toString();
}
