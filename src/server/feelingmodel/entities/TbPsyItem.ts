import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_psy_item', { schema: 'feeeling' })
export class TbPsyItem {
  @PrimaryColumn('int', { name: 'psy_item_id' })
  psy_item_id: number;

  @Column('int', { name: 'test_id' })
  test_id: number;

  @Column('varchar', {
    name: 'psy_item_group',
    length: 30,
    default: () => "''",
  })
  psy_item_group: string;

  @Column('varchar', { name: 'psy_item_name', length: 30, default: () => "''" })
  psy_item_name: string;

  @Column('varchar', { name: 'psy_item_img', length: 50, default: () => "''" })
  psy_item_img: string;

  @Column('varchar', { name: 'psy_item_comment', length: 400 })
  psy_item_comment: string;

  @Column('varchar', { name: 'psy_item_feature', length: 50 })
  psy_item_feature: string;

  @Column('varchar', { name: 'psy_item_desc', length: 400 })
  psy_item_desc: string;

  @Column('char', { name: 'use_yn', length: 1, default: () => "'Y'" })
  use_yn: string;

  @Column('char', { name: 'lang', length: 3, default: () => "'kor'" })
  lang: string;
}
