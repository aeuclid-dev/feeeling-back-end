import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_stat_class', { schema: 'feeeling' })
export class TbStatClass {
  @PrimaryColumn('int', { name: 'stat_class_id', unsigned: true })
  stat_class_id: number | null;

  @Column('varchar', { name: 'stat_class', nullable: true, length: 30 })
  stat_class: string | null;

  @Column('varchar', { name: 'stat_name', nullable: true, length: 30 })
  stat_name: string | null;

  @Column('tinyint', { name: 'stat_flag', nullable: true, unsigned: true })
  stat_flag: number | null;

  @Column('varchar', { name: 'stat_desc', nullable: true, length: 50 })
  stat_desc: string | null;

  @Column('char', { name: 'use_YN', nullable: true, length: 1 })
  use_YN: string | null;

  @Column('char', { name: 'lang', nullable: true, length: 3 })
  lang: string | null;
}
