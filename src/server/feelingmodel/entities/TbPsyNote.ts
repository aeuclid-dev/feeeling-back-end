import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_psy_note', { schema: 'feeeling' })
export class TbPsyNote {
  @PrimaryColumn('int', { name: 'psy_note_id', unsigned: true })
  psy_note_id: number;

  @Column('int', {
    name: 'psy_class_id',
    nullable: true,
    comment: 'tb_psy_class 테이블의 키 값임',
  })
  psy_class_id: number | null;

  @Column('int', {
    name: 'psy_subclass_id',
    nullable: true,
    comment: 'tb_psy_subclass 테이블의 키 값임',
  })
  psy_subclass_id: number | null;

  @Column('varchar', {
    name: 'note_type',
    nullable: true,
    comment:
      '노트의 목적에 따라 class_title, class_subtitle, status_title, status_desc, char_desc, solution_desc로 나뉘어짐',
    length: 20,
  })
  note_type: string | null;

  @Column('tinyint', {
    name: 'note_seq',
    nullable: true,
    comment:
      'note가 여러 개일 경우 보여주는 순서. 혹은 랜덤으로 보여질 경우 note의 가지수를 알려주는 용도로 사용',
    unsigned: true,
  })
  note_seq: number | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '노트의 내용으로 심리 검사 결과에 따라 앱에 보여주는 내용임',
    length: 400,
  })
  note: string | null;

  @Column('char', {
    name: 'use_yn',
    nullable: true,
    comment:
      'note의 사용여부를 체크 사용할 경우 Y, 사용하지 않을 경우 N. 디폴트는 Y임',
    length: 1,
    default: () => "'Y'",
  })
  use_yn: string | null;

  @Column('varchar', { name: 'note_desc', nullable: true, length: 50 })
  note_desc: string | null;

  @Column('char', {
    name: 'lang',
    nullable: true,
    comment: "한국어는 'kor'",
    length: 3,
    default: () => "'kor'",
  })
  lang: string | null;
}
