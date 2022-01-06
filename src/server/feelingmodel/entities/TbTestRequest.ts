import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbUser as user } from './TbUser';
import { TbTestResult as tb_result } from './TbTestResult';
import { TbTest as test } from './TbTest';
import { TbImage as image } from './TbImage';
import { TbTestee as testee } from './TbTestee';

@Index('user_no', ['user_no'], {})
@Index('test_time', ['test_time'], {})
@Entity('tb_test_request', { schema: 'feeeling' })
export class TbTestRequest {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'test_req_no',
    unsigned: true,
  })
  test_req_no: string;

  @Column('int', {
    name: 'user_no',
    comment: '사용자 no',
    unsigned: true,
    default: () => "'0'",
  })
  user_no: number;

  @Column('varchar', {
    name: 'user_id',
    comment: '사용자 id - 이메일 형식',
    length: 50,
    default: () => "''",
  })
  user_id: string;

  @Column('tinyint', {
    name: 'test_id',
    comment:
      'tb_test.test_id\r\n\r\n검사 종류 코드\r\n\r\npitr: 100\r\nhouse: 101\r\ntree: 102 \r\nman: 103\r\nwoman: 104',
    unsigned: true,
    default: () => "'0'",
  })
  test_id: number;

  @Column('int', {
    name: 'testee_no',
    comment: '피검사자 no - tb_testee.no (그린이)',
    unsigned: true,
    default: () => "'0'",
  })
  testee_no: number;

  @Column('text', {
    name: 'test_question',
    comment: 'JSON 타입 - 질문/ 선택한답변 정보',
  })
  test_question: string;

  @Column('bigint', {
    name: 'image_no',
    comment: '이미지 no.   tb_test_image.no',
    unsigned: true,
    default: () => "'0'",
  })
  image_no: string;

  @Column('bigint', {
    name: 'test_time',
    comment: '검사 의뢰 시각 UTC - 단위: ms',
    unsigned: true,
    default: () => "'0'",
  })
  test_time: string;

  @Column('tinyint', {
    name: 'status',
    comment: '검사진행 상태\r\n검사의뢰(접수완료): 0\r\n검사완료: 1',
    unsigned: true,
    default: () => "'0'",
  })
  status: number;

  @ManyToOne(() => user, (user) => user.user_requests)
  @JoinColumn({ name: 'user_no' })
  user: user;

  @OneToOne((type) => tb_result, (tb_result) => tb_result.testRequest)
  @JoinColumn({ name: 'test_req_no' })
  test_result: tb_result;

  @OneToOne((type) => image)
  @JoinColumn({ name: 'image_no' })
  linkimage: image;

  @ManyToOne(() => testee, (testee) => testee.testee_request)
  @JoinColumn({ name: 'testee_no' })
  testeeinfo: testee;

  @OneToOne((type) => test)
  @JoinColumn({ name: 'test_id' })
  linktestname: test;
}
