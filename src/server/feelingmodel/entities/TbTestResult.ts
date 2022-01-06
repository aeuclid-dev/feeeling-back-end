import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { TbUser as user } from './TbUser';
import { TbTestRequest as testRequest } from './TbTestRequest';
@Entity('tb_test_result', { schema: 'feeeling' })
export class TbTestResult {
  @Column('bigint', { primary: true, name: 'test_req_no', unsigned: true })
  test_req_no: string;

  @Column('mediumtext', { name: 'result' })
  result: string;

  @Column('bigint', { name: 'result_time', unsigned: true })
  result_time: string;

  @OneToOne((type) => testRequest, (testRequest) => testRequest.test_result)
  @JoinColumn({ name: 'test_req_no' })
  testRequest: testRequest;
}
