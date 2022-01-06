import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_stat', { schema: 'feeeling' })
export class TbStat {
  @PrimaryColumn('int', { name: 'stat_id' })
  stat_id: number | null;

  @Column('int', { name: 'test_id', nullable: true })
  test_id: number | null;

  @Column('int', { name: 'stat_class_id', nullable: true })
  stat_class_id: number | null;

  @Column('char', {
    name: 'stat_date',
    nullable: true,
    comment: 'yyyy-mm-dd',
    length: 10,
  })
  stat_date: string | null;

  @Column('int', { name: 'stat_class_number', nullable: true })
  stat_class_number: number | null;

  @Column('float', { name: 'stat_class_avg', nullable: true, precision: 12 })
  stat_class_avg: number | null;

  @Column('float', { name: 'stat_class_std', nullable: true, precision: 12 })
  stat_class_std: number | null;
}
