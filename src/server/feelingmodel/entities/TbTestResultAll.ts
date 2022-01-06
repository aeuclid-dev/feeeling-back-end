import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_test_result_all', { schema: 'feeeling' })
export class TbTestResultAll {
  @PrimaryColumn('int', { name: 'test_req_no' })
  test_req_no: number | null;

  @Column('varchar', { name: 'psy_note_sub_title', length: 50 })
  psy_note_sub_title: string;

  @Column('varchar', { name: 'psy_note_title', length: 50 })
  psy_note_title: string;

  @Column('varchar', { name: 'psy_char_img', length: 50 })
  psy_char_img: string;

  @Column('varchar', { name: 'psy_item_img1', length: 50 })
  psy_item_img1: string;

  @Column('varchar', { name: 'psy_item_name1', length: 50 })
  psy_item_name1: string;

  @Column('varchar', { name: 'psy_item_comment1', length: 500 })
  psy_item_comment1: string;

  @Column('varchar', { name: 'psy_item_feature1', length: 50 })
  psy_item_feature1: string;

  @Column('varchar', { name: 'psy_item_img2', length: 50 })
  psy_item_img2: string;

  @Column('varchar', { name: 'psy_item_name2', length: 50 })
  psy_item_name2: string;

  @Column('varchar', { name: 'psy_item_comment2', length: 500 })
  psy_item_comment2: string;

  @Column('varchar', { name: 'psy_item_feature2', length: 50 })
  psy_item_feature2: string;

  @Column('varchar', { name: 'psy_item_img3', length: 50 })
  psy_item_img3: string;

  @Column('varchar', { name: 'psy_item_name3', length: 50 })
  psy_item_name3: string;

  @Column('varchar', { name: 'psy_item_comment3', length: 500 })
  psy_item_comment3: string;

  @Column('varchar', { name: 'psy_item_feature3', length: 50 })
  psy_item_feature3: string;

  @Column('varchar', { name: 'psy_item_img4', length: 50 })
  psy_item_img4: string;

  @Column('varchar', { name: 'psy_item_name4', length: 50 })
  psy_item_name4: string;

  @Column('varchar', { name: 'psy_item_comment4', length: 500 })
  psy_item_comment4: string;

  @Column('varchar', { name: 'psy_item_feature4', length: 50 })
  psy_item_feature4: string;

  @Column('varchar', { name: 'psy_note_main_status', length: 200 })
  psy_note_main_status: string;

  @Column('varchar', { name: 'psy_note_detail_status', length: 400 })
  psy_note_detail_status: string;

  @Column('varchar', { name: 'psy_item_desc1', length: 200 })
  psy_item_desc1: string;

  @Column('varchar', { name: 'psy_item_desc2', length: 200 })
  psy_item_desc2: string;

  @Column('varchar', { name: 'psy_item_desc3', length: 200 })
  psy_item_desc3: string;

  @Column('varchar', { name: 'psy_item_desc4', length: 200 })
  psy_item_desc4: string;

  @Column('varchar', { name: 'test_name', length: 30 })
  test_name: string;

  @Column('tinyint', { name: 'test_score' })
  test_score: number;

  @Column('varchar', { name: 'stat_class1', length: 20 })
  stat_class1: string;

  @Column('varchar', { name: 'stat_class_name1', length: 20 })
  stat_class_name1: string;

  @Column('float', { name: 'stat_percentage1', precision: 12 })
  stat_percentage1: number;

  @Column('varchar', { name: 'stat_class2', length: 20 })
  stat_class2: string;

  @Column('varchar', { name: 'stat_class_name2', length: 20 })
  stat_class_name2: string;

  @Column('float', { name: 'stat_percentage2', precision: 12 })
  stat_percentage2: number;

  @Column('varchar', { name: 'stat_class3', length: 20 })
  stat_class3: string;

  @Column('varchar', { name: 'stat_class_name3', length: 20 })
  stat_class_name3: string;

  @Column('float', { name: 'stat_percentage3', precision: 12 })
  stat_percentage3: number;

  @Column('varchar', { name: 'psy_note_detail_solution', length: 400 })
  psy_note_detail_solution: string;

  @Column('int', { name: 'checked_by' })
  checked_by: number;

  @Column('char', {
    name: 'checked_date',
    comment: '2021-11-01 07:25:12',
    length: 19,
  })
  checked_date: string;
}
