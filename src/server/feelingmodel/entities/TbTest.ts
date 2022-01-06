import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbTestRequest as request } from './TbTestRequest';

@Entity('tb_test', { schema: 'feeeling' })
export class TbTest {
  @PrimaryGeneratedColumn({
    type: 'tinyint',
    name: 'test_id',
    comment: '심리검사 테스트의 종류를 나타내는 일련번호',
    unsigned: true,
  })
  test_id: number;

  @Column('varchar', {
    name: 'test_name',
    nullable: true,
    comment:
      '검사 종류 코드\r\n\r\npitr: 빗속의사람\r\nhouse: 집 그림\r\ntree: 나무 그림 \r\nman: 남자 그림\r\nwoman: 여자 그림',
    length: 20,
  })
  test_name: string | null;

  @Column('varchar', {
    name: 'test_start_date',
    nullable: true,
    comment: '심리검사 서비스 시작 날짜',
    length: 10,
  })
  test_start_date: string | null;

  @Column('varchar', {
    name: 'test_end_date',
    nullable: true,
    comment: '심리검사 서비스 종료 날짜',
    length: 10,
  })
  test_end_date: string | null;

  @Column('varchar', {
    name: 'use_yn',
    nullable: true,
    comment:
      '심리검사의 현재 서비스 유무를 체크함 디폴트는 Y, 서비스를 하지 않는 경우 N',
    length: 1,
    default: () => "'Y'",
  })
  use_yn: string | null;

  @Column('varchar', {
    name: 'test_category',
    nullable: true,
    comment:
      '현재는 모두 drawing으로 입력. 향 후 서비스가 확대되면 appconfigure, appdrawing추가 예정',
    length: 20,
    default: () => "''",
  })
  test_category: string | null;

  @Column('varchar', {
    name: 'test_type',
    nullable: true,
    comment: '현재는 사용하지 않는 컬럼',
    length: 20,
  })
  test_type: string | null;

  @Column('varchar', {
    name: 'test_desc',
    nullable: true,
    comment: '검사 설명',
    length: 50,
  })
  test_desc: string | null;

  @OneToOne((type) => request)
  @JoinColumn({ name: 'test_id' })
  request: request;
}
