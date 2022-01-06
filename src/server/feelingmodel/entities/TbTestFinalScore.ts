import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_test_final_score', { schema: 'feeeling' })
export class TbTestFinalScore {
  @PrimaryColumn('int', { name: 'test_req_no' })
  test_req_no: number;

  @Column('int', { name: 'test_id' })
  test_id: number;

  @Column('int', { name: 'user_no' })
  user_no: number;

  @Column('varchar', {
    name: 'check_category',
    length: 30,
    default: () => "''",
  })
  check_category: string;

  @Column('tinyint', { name: 'checked_score' })
  checked_score: number;

  @Column('tinyint', { name: 'tester_adjusted_score' })
  tester_adjusted_score: number;

  @Column('tinyint', { name: 'final_score' })
  final_score: number;

  @Column('varchar', { name: 'checked_by', length: 20 })
  checked_by: string;

  @Column('varchar', { name: 'checked_date', length: 19 })
  checked_date: string;
}
