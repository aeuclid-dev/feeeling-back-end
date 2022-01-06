import { PrimaryColumn, Column, Entity, OneToMany, JoinColumn } from 'typeorm';
import { TbPsyCheckScore as checkscore } from './TbPsyCheckScore';

@Entity('tb_psy_check', { schema: 'feeeling' })
export class TbPsyCheck {
  @PrimaryColumn('int', { name: 'psy_check_id' })
  psy_check_id: number;

  @Column('tinyint', { name: 'test_id', nullable: true })
  test_id: number | null;

  @Column('varchar', { name: 'check_category', nullable: true, length: 30 })
  check_category: string | null;

  @Column('tinyint', { name: 'check_seq', nullable: true })
  check_seq: number | null;

  @Column('varchar', { name: 'check_item', nullable: true, length: 50 })
  check_item: string | null;

  @Column('varchar', { name: 'check_desc', nullable: true, length: 100 })
  check_desc: string | null;

  @Column('char', { name: 'user_YN', nullable: true, length: 1 })
  user_YN: string | null;

  @Column('char', { name: 'lang', nullable: true, length: 3 })
  lang: string | null;

  @OneToMany((type) => checkscore, (checkscore) => checkscore.check)
  @JoinColumn({ name: 'psy_check_id' })
  checkScore: checkscore[];
}
