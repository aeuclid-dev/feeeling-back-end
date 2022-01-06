import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { getTimeStampUTC, getTimeFormatUTC } from '../../common/util';
export class AdminCheckedTestDto {
  @IsNumber()
  admin_no: number;
  @IsNumber()
  test_req_no: number;
  @IsNumber()
  test_status: number;
  @IsNotEmpty()
  readonly checked_date: string = getTimeFormatUTC('yyyy-MM-DD').toString();
  @IsNotEmpty()
  readonly checked_time: string = getTimeStampUTC().toString();
  @IsString()
  user_grade: string;
  @IsString()
  user_comment: string;
  @IsNotEmpty()
  readonly user_grade_date: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
  @IsNotEmpty()
  readonly user_grade_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  readonly creation_date: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
  @IsNotEmpty()
  readonly creation_time: string = getTimeStampUTC().toString();
  @IsNotEmpty()
  lang: string = 'kor';
}

export class TestScoreInsertDto {
  @IsNumber()
  test_req_no: number;
  @IsNumber()
  psy_check_id: number;
  @IsNumber()
  check_score: number;
  @IsString()
  checked_by: string;
  @IsNotEmpty()
  readonly checked_date: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}

export class TestFinalScoreInsertDto {
  @IsNumber()
  test_req_no: number;
  @IsNumber()
  test_id: number;
  @IsNumber()
  user_no: number;
  @IsString()
  check_category: string;

  @IsNumber()
  checked_score: number;
  @IsNumber()
  tester_adjusted_score: number;
  @IsNumber()
  final_score: number;

  @IsString()
  checked_by: string;
  @IsNotEmpty()
  readonly checked_date: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}

export class TestResultAllInsertDto {
  @IsNumber()
  test_req_no: number;
  @IsString()
  psy_note_sub_title: string;
  @IsString()
  psy_note_title: string;
  @IsString()
  psy_char_img: string;
  @IsString()
  psy_item_img1: string;
  @IsString()
  psy_item_name1: string;
  @IsString()
  psy_item_comment1: string;
  @IsString()
  psy_item_feature1: string;
  @IsString()
  psy_item_img2: string;
  @IsString()
  psy_item_name2: string;
  @IsString()
  psy_item_comment2: string;
  @IsString()
  psy_item_feature2: string;
  @IsString()
  psy_item_img3: string;
  @IsString()
  psy_item_name3: string;
  @IsString()
  psy_item_comment3: string;
  @IsString()
  psy_item_feature3: string;
  @IsString()
  psy_item_img4: string;
  @IsString()
  psy_item_name4: string;
  @IsString()
  psy_item_comment4: string;
  @IsString()
  psy_item_feature4: string;
  @IsString()
  psy_note_main_status: string;
  @IsString()
  psy_note_detail_status: string;
  @IsString()
  psy_item_desc1: string;
  @IsString()
  psy_item_desc2: string;
  @IsString()
  psy_item_desc3: string;
  @IsString()
  psy_item_desc4: string;
  @IsString()
  test_name: string;
  @IsNumber()
  test_score: number;
  @IsNumber()
  check_category_score1: number;
  @IsNumber()
  check_category_score2: number;
  @IsString()
  stat_class1: string;
  @IsString()
  stat_class_name1: string;
  @IsNumber()
  stat_percentage1: number;
  @IsString()
  stat_class2: string;
  @IsString()
  stat_class_name2: string;
  @IsNumber()
  stat_percentage2: number;
  @IsString()
  stat_class3: string;
  @IsString()
  stat_class_name3: string;
  @IsNumber()
  stat_percentage3: number;
  @IsString()
  psy_note_detail_solution: string;
  @IsString()
  checked_by: number;
  @IsNotEmpty()
  readonly checked_date: string = getTimeFormatUTC(
    'yyyy-MM-DD HH:mm:ss',
  ).toString();
}

export class TestResultInsertDto {
  @IsNumber()
  test_req_no: number;
  @IsString()
  result: string;
  @IsNotEmpty()
  readonly result_time: string = getTimeStampUTC().toString();
}
