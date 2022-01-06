import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_admin_checked_test', { schema: 'feeeling' })
export class TbAdminCheckedTest {
  @PrimaryColumn('int', { name: 'admin_no', unsigned: true })
  admin_no: number;
  @PrimaryColumn('int', { name: 'test_req_no', unsigned: true })
  test_req_no: number;

  @Column('tinyint', {
    name: 'test_status',
    unsigned: true,
    comment:
      '1은 검사 진행중임을, 2는 검사완료임을 나타냄, 8은 담당자가 스코어링 하기 어려운 검사, 9는 최종적으로 검사에 부적합한 그림으로 피드백 ',
    default: () => 1,
  })
  test_status: number;

  @Column('char', {
    name: 'checked_date',
    nullable: true,
    comment:
      'YYYY-MM-DD 최종 검사일을 표시, test_status가 2나 9일 경우에만 데이터를 저장함',
    length: 19,
  })
  checked_date: string | null;

  @Column('bigint', {
    name: 'checked_time',
    comment: 'creation_date ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  checked_time: string;

  @Column('char', {
    name: 'user_grade',
    nullable: true,
    comment: 'grade',
    length: 1,
  })
  user_grade: string | null;

  @Column('varchar', {
    name: 'user_comment',
    nullable: true,
    length: 400,
  })
  user_comment: string | null;

  @Column('char', {
    name: 'user_grade_date',
    nullable: true,
    comment: 'yyyy-MM-dd HH:mm:ss',
    length: 19,
  })
  user_grade_date: string | null;

  @Column('bigint', {
    name: 'user_grade_time',
    comment: 'creation_date ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  user_grade_time: string;

  @Column('char', {
    name: 'creation_date',
    comment: 'yyyy-MM-dd HH:mm:ss',
    length: 19,
  })
  creation_date: string;

  @Column('bigint', {
    name: 'creation_time',
    comment: 'creation_date ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  creation_time: string;

  @Column('varchar', { name: 'lang', length: 3, default: () => 'kor' })
  lang: string;
}
