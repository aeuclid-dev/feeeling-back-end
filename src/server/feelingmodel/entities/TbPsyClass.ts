import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_psy_class', { schema: 'feeeling' })
export class TbPsyClass {
  @PrimaryColumn('int', { name: 'psy_class_id', unsigned: true })
  psy_class_id: number;

  @Column('tinyint', { name: 'test_id', comment: '100은 PITR', unsigned: true })
  test_id: number;

  @Column('varchar', {
    name: 'psy_class',
    comment: 'PITR은 a, b, c, d, h의 5가지 클래스가 있음',
    length: 2,
    default: () => "''",
  })
  psy_class: string;

  @Column('varchar', {
    name: 'psy_class_name',
    comment: "'왕관을 쓴 거북이' 등",
    length: 30,
    default: () => "''",
  })
  psy_class_name: string;

  @Column('varchar', {
    name: 'psy_class_desc',
    nullable: true,
    length: 50,
    default: () => "''",
  })
  psy_class_desc: string | null;

  @Column('char', { name: 'use_YN', nullable: true, length: 1 })
  use_YN: string | null;

  @Column('varchar', {
    name: 'lang',
    nullable: true,
    comment: "디폴트 'kor'",
    length: 3,
    default: () => "''",
  })
  lang: string | null;
}
