import { PrimaryColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TbPsyCheck as check } from './TbPsyCheck';

@Entity('tb_psy_check_score', { schema: 'feeeling' })
export class TbPsyCheckScore {
  @PrimaryColumn('int', { name: 'psy_check_score_id' })
  psy_check_score_id: number;

  @Column('int', { name: 'psy_check_id', nullable: true })
  psy_check_id: number | null;

  @Column('tinyint', { name: 'score_seq', nullable: true })
  score_seq: number | null;

  @Column('varchar', { name: 'score_item', nullable: true, length: 100 })
  score_item: string | null;

  @Column('tinyint', { name: 'score', nullable: true })
  score: number | null;

  @Column('varchar', { name: 'score_desc', nullable: true, length: 50 })
  score_desc: string | null;

  @Column('char', { name: 'lang', nullable: true, length: 3 })
  lang: string | null;

  @ManyToOne((type) => check, (check) => check.checkScore)
  @JoinColumn({ name: 'psy_check_id' })
  check: check;
}
