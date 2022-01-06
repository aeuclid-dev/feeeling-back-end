import { IsString, IsObject } from 'class-validator';
export class ReturnResult {
  @IsString()
  status: String;
  @IsString()
  message: String;
}
