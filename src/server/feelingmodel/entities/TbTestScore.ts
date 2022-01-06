import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_test_score', { schema: 'feeeling' })
export class TbTestScore {
  @PrimaryColumn('int', { name: 'test_req_no' })
  test_req_no: number | null;

  @PrimaryColumn('int', { name: 'psy_check_id' })
  psy_check_id: number | null;

  @Column('tinyint', { name: 'check_score', nullable: true })
  check_score: number | null;

  @Column('varchar', { name: 'checked_by', nullable: true, length: 20 })
  checked_by: string | null;

  @Column('char', {
    name: 'checked_date',
    nullable: true,
    comment: 'yyyy-MM-dd HH:mm:ss',
    length: 19,
  })
  checked_date: string | null;
}
