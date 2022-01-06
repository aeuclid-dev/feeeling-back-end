import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('posting_no', ['posting_no'], {})
@Entity('tb_public_posting', { schema: 'feeeling' })
export class TbPublicPosting {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'posting_no',
    comment: '공지사항번호',
    unsigned: true,
  })
  posting_no: number;

  @Column('varchar', { name: 'posting_title', length: 30 })
  posting_title: string;

  @Column('varchar', { name: 'posting_contents', length: 2000 })
  posting_contents: string;

  @Column('bigint', {
    name: 'reg_time',
    comment: '등록 시각. ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  reg_time: string;

  @Column('char', {
    name: 'reg_datetime',
    comment: '등록 시각 yyyy-MM-dd HH:mm:ss',
    length: 19,
    default: () => "''",
  })
  reg_datetime: string;

  @Column('tinyint', {
    name: 'status',
    comment: '미정',
    default: () => "'0'",
  })
  status: number;
}
