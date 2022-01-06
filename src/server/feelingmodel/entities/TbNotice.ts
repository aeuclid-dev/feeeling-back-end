import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbTestRequest as tb_request } from './TbTestRequest';
@Index('user_no', ['user_no'], {})
@Entity('tb_notice', { schema: 'feeeling' })
export class TbNotice {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'notice_no', unsigned: true })
  notice_no: number;

  @Column('bigint', {
    name: 'test_req_no',
    comment: 'tb_user.test_req_no',
    unsigned: true,
  })
  test_req_no: string;

  @Column('varchar', {
    name: 'notice_status',
    comment: 'requested, rejected, completed',
    nullable: false,
    default: '',
  })
  notice_status: string;

  @Column('int', {
    name: 'user_no',
    comment: 'tb_user.user_no',
    unsigned: true,
  })
  user_no: number;

  @Column('int', {
    name: 'testee_no',
    comment: 'testee_no',
    unsigned: true,
  })
  testee_no: number;

  @Column('bigint', {
    name: 'image_no',
    comment: 'tb_image_image_no',
    unsigned: true,
  })
  image_no: string;

  @Column('bigint', {
    name: 'reg_time',
    comment: '알림 등록 시각 UNIX TIMESTAMP 단위:ms   - UTC',
    unsigned: true,
  })
  reg_time: string;

  @Column('bigint', {
    name: 'read_time',
    comment: '알림 확인 시각 UNIX TIMESTAMP 단위:ms  - UTC',
    unsigned: true,
  })
  read_time: string;

  @Column('tinyint', {
    name: 'status',
    comment: '읽음 상태 -  0: 읽었음,  1: 새알림',
    unsigned: true,
    default: () => "'1'",
  })
  status: number;

  @ManyToOne((type) => tb_request)
  @JoinColumn({ name: 'test_req_no' })
  testRequest: tb_request;
}
