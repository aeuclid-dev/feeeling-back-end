import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbTestRequest as request } from './TbTestRequest';
import { TbUser as user } from './TbUser';

@Index('user_no', ['user_no'], {})
@Entity('tb_testee', { schema: 'feeeling' })
export class TbTestee {
  @PrimaryGeneratedColumn({ type: 'int', name: 'testee_no', unsigned: true })
  testee_no: number;

  @Column('int', {
    name: 'user_no',
    comment: '사용자 no  - tb_user.user_no',
    unsigned: true,
    default: () => "'0'",
  })
  user_no: number;

  @Column('varchar', {
    name: 'nickname',
    comment: '별명',
    length: 20,
    default: () => "'0'",
  })
  nickname: string;

  @Column('char', {
    name: 'birthday',
    comment: 'yyyy-MM-dd',
    length: 10,
    default: () => "''",
  })
  birthday: string;

  @Column('tinyint', {
    name: 'gender',
    comment: '성별: 0: 미지정, 1: 남성, 2: 여성',
    unsigned: true,
    default: () => "'0'",
  })
  gender: number;

  @Column('bigint', {
    name: 'reg_time',
    comment: '등록 시각 UTC - UNIX TIMESTAMP',
    unsigned: true,
    default: () => "'0'",
  })
  reg_time: string;

  @Column('varchar', {
    name: 'profile_photo',
    comment: '프로필 사진 id',
    length: 50,
    default: () => "''",
  })
  profile_photo: string;

  @Column('tinyint', {
    name: 'type',
    comment: '0:메인계정에 해당되는 최초 테스터, 1: 계정에서 추가한 테스터',
    unsigned: true,
    default: () => '0',
  })
  type: number;

  @OneToMany((type) => request, (request) => request.testeeinfo)
  @JoinColumn({ name: 'testee_no' })
  testee_request: request[];

  @ManyToOne((type) => user, (user) => user.testees)
  @JoinColumn({ name: 'user_no' })
  userInfo: user;
}
