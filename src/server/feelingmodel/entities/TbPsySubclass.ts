import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_psy_subclass', { schema: 'feeeling' })
export class TbPsySubclass {
  @PrimaryColumn('int', { name: 'psy_subclass_id' })
  psy_subclass_id: number;

  @Column('tinyint', { name: 'test_id', default: () => "'100'" })
  test_id: number;

  @Column('varchar', {
    name: 'psy_subclass_type',
    length: 20,
    default: () => "'item'",
  })
  psy_subclass_type: string;

  @Column('varchar', { name: 'psy_subclass', length: 40 })
  psy_subclass: string;

  @Column('tinyint', { name: 'psy_subclass_seq', default: () => "'1'" })
  psy_subclass_seq: number;

  @Column('varchar', { name: 'psy_subclass_name', length: 50 })
  psy_subclass_name: string;

  @Column('varchar', { name: 'psy_subclass_desc', nullable: true, length: 50 })
  psy_subclass_desc: string | null;

  @Column('char', { name: 'use_YN', length: 1, default: () => "'Y'" })
  use_YN: string;

  @Column('char', { name: 'lang', length: 3, default: () => "'kor'" })
  lang: string;
}
