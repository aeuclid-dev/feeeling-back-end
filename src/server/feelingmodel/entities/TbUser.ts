import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbPoint as point } from './TbPoint';
import { TbTestRequest as tb_request } from './TbTestRequest';
import { TbTestResult as tb_result } from './TbTestResult';
import { TbTestee as testee } from './TbTestee';

@Index('id', ['user_id'], { unique: true })
@Index('auth_token', ['auth_token'], {})
@Entity('tb_user', { schema: 'feeeling' })
export class TbUser {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'user_no',
    comment: '사용자 고유 번호',
    unsigned: true,
  })
  user_no: number;

  @Column('varchar', {
    name: 'user_id',
    unique: true,
    comment: '로그인 id - 이메일 형식',
    length: 50,
    default: () => "''",
  })
  user_id: string;

  @Column('varchar', {
    name: 'pwd',
    comment: '암호 Hash512',
    length: 128,
    default: () => "''",
  })
  pwd: string;

  @Column('varchar', {
    name: 'sns_id',
    comment: 'sns 사용자 id',
    length: 30,
    default: () => "''",
  })
  sns_id: number;

  @Column('varchar', {
    name: 'mobile',
    comment: '사용자 휴대폰 번호 "-" 제거',
    length: 20,
    default: () => "''",
  })
  mobile: string;

  @Column('varchar', {
    name: 'nickname',
    comment: '별명',
    length: 30,
    default: () => "''",
  })
  nickname: string;

  @Column('tinyint', {
    name: 'gender',
    comment: '성별: 0: 미지정, 1: 남성, 2: 여성',
    default: () => "'0'",
  })
  gender: number;

  @Column('char', {
    name: 'birthday',
    comment: '생년월일 yyyy-MM-dd',
    length: 10,
    default: () => "''",
  })
  birthday: string;

  @Column('varchar', {
    name: 'profile_photo',
    comment: '프로필 사진 id',
    length: 50,
    default: () => "''",
  })
  profile_photo: string;

  @Column('varchar', {
    name: 'auth_token',
    comment: '로그인 인증 토큰',
    length: 200,
    default: () => "''",
  })
  auth_token: string;

  @Column('varchar', {
    name: 'web_token',
    comment: '웹 접근 인증 토큰',
    length: 128,
    default: () => "''",
  })
  web_token: string;

  @Column('varchar', {
    name: 'push_token',
    comment: '모바일 푸시 토큰',
    length: 200,
    default: () => "''",
  })
  push_token: string;

  @Column('varchar', {
    name: 'device_id',
    comment: '모바일 단말기 id',
    length: 128,
    default: () => "''",
  })
  device_id: string;

  @Column('tinyint', {
    name: 'device_type',
    comment: '0: android, 1: ios',
    default: () => "'0'",
  })
  device_type: number;

  @Column('bigint', {
    name: 'reg_time',
    comment: '가입 시각. ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  reg_time: string;

  @Column('char', {
    name: 'reg_datetime',
    comment: '가입 시각 yyyy-MM-dd HH:mm:ss',
    length: 19,
    default: () => "''",
  })
  reg_datetime: string;

  @Column('bigint', {
    name: 'updt_time',
    comment: '수정 시각 ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  updt_time: string;

  @Column('char', {
    name: 'updt_datetime',
    comment: '수정 시각 yyyy-MM-dd HH:mm:ss',
    length: 19,
    default: () => "''",
  })
  updt_datetime: string;

  @Column('varchar', {
    name: 'nation',
    comment: '국가코드\r\n예) en-US, sv-SE, ko-KR"\r\n',
    length: 6,
    default: () => "''",
  })
  nation: string;

  @Column('tinyint', {
    name: 'type',
    comment: '0: 일반, 1: 카카오, 2: 네이버',
    unsigned: true,
    default: () => "'0'",
  })
  type: number;

  @Column('bigint', {
    name: 'last_access_time',
    comment: '마지막 접근 시각 ms. UTC',
    unsigned: true,
    default: () => "'0'",
  })
  last_access_time: string;

  @Column('tinyint', {
    name: 'status',
    comment: '0: 가입, 1: 탈퇴',
    default: () => "'0'",
  })
  status: number;

  @Column('bigint', {
    name: 'withdrawal_time',
    comment: '탈퇴 시각 ms UTC',
    unsigned: true,
    default: () => "'0'",
  })
  withdrawal_time: string;

  @OneToOne((type) => point)
  @JoinColumn({ name: 'user_no' })
  user_point: point;

  @OneToMany((type) => tb_request, (tb_request) => tb_request.user)
  @JoinColumn({ name: 'user_no' })
  user_requests: tb_request[];

  @OneToMany((type) => testee, (testee) => testee.userInfo)
  @JoinColumn({ name: 'user_no' })
  testees: testee[];
}
