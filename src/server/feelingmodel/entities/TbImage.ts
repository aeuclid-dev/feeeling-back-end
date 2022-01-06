import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbTestRequest as request } from './TbTestRequest';

@Entity('tb_image', { schema: 'feeeling' })
export class TbImage {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'image_no', unsigned: true })
  image_no: string;

  @Column('varchar', {
    name: 'image_id',
    comment:
      '이미지 id   - UTC\ntest_no(11자리) + _yyyyMMddHHmmss  = 26\nthumb: tset_no(11자리) + _yyyyMMddHHmmss_thumb.jpg"',
    length: 50,
    default: () => "''",
  })
  image_id: string;

  @Column('varchar', {
    name: 'image_comment',
    length: 300,
    default: () => "''",
  })
  image_comment: string;

  @Column('int', {
    name: 'testee_no',
    comment: '그린이   tb_testee.no',
    unsigned: true,
    default: () => "'0'",
  })
  testee_no: number;

  @Column('bigint', {
    name: 'reg_time',
    comment: '등록시각 UTC - 단위: ms',
    unsigned: true,
    default: () => "'0'",
  })
  reg_time: string;

  @OneToOne((type) => request)
  @JoinColumn({ name: 'image_no' })
  request: request;
}
