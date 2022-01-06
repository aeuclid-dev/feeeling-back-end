import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_user')
export class member extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_no: number;

  @Column()
  user_id: string;
  @Column()
  pwd: string;
  @Column()
  nickname: string;
  @Column()
  sns_id: number;
  @Column()
  mobile: string;
  @Column()
  gender: number;
  @Column()
  birthday: string;
  @Column()
  profile_photo: string;
  @Column()
  auth_token: string;
  @Column()
  web_token: string;
  @Column()
  push_token: string;
  @Column()
  device_id: string;
  @Column()
  device_type: number;
  @Column({ type: 'bigint' })
  reg_time: string; //bigint
  @Column()
  reg_datetime: string;
  @Column({ type: 'bigint' })
  updt_time: string; //bigint
  @Column()
  updt_datetime: string;
  @Column()
  nation: string;
  @Column()
  type: number;
  @Column({ type: 'bigint' })
  last_access_time: string; //bigint
  @Column()
  status: number;
  @Column({ type: 'bigint' })
  withdrawal_time: string; //bigint
}
