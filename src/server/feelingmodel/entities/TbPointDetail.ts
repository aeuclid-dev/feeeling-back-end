import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('user_no', ['user_no'], {})
@Entity('tb_point_detail', { schema: 'feeeling' })
export class TbPointDetail {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'point_no', unsigned: true })
  point_no: string;

  @Column('int', { name: 'user_no', unsigned: true })
  user_no: number;

  @Column('smallint', { name: 'point', unsigned: true })
  point: number;

  @Column('bigint', { name: 'reg_time', unsigned: true, default: () => "'0'" })
  reg_time: string;
}
