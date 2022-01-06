import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { TbUser as user } from './TbUser';

@Entity('tb_point', { schema: 'feeeling' })
export class TbPoint {
  @Column('int', { primary: true, name: 'user_no', unsigned: true })
  user_no: number;

  @Column('int', { name: 'total_point', unsigned: true })
  total_point: number;

  @OneToOne(() => user, (user) => user.user_point)
  user: user;
}
