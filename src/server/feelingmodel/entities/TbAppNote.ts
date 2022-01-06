import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('app_note_usage', ['app_note_usage'], {})
@Entity('tb_app_note', { schema: 'feeeling' })
export class TbAppNote {
  @PrimaryColumn('int', { name: 'app_note_id' })
  app_note_id: number | null;

  @Column('varchar', { name: 'app_note_category', nullable: true, length: 30 })
  app_note_category: string | null;

  @Column('varchar', { name: 'app_note_usage', nullable: true, length: 30 })
  app_note_usage: string | null;

  @Column('tinyint', { name: 'note_seq', nullable: true })
  note_seq: number | null;

  @Column('varchar', { name: 'app_note', nullable: true, length: 2000 })
  app_note: string | null;

  @Column('char', { name: 'user_yn', nullable: true, length: 1 })
  user_yn: string | null;

  @Column('varchar', { name: 'start_date', nullable: true, length: 19 })
  start_date: string | null;

  @Column('varchar', { name: 'end_date', nullable: true, length: 19 })
  end_date: string | null;

  @Column('char', { name: 'lang', nullable: true, length: 3 })
  lang: string | null;
}
