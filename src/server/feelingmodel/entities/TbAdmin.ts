import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('tb_admin', { schema: 'feeeling' })
export class TbAdmin {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'admin_no',
    comment: '관리자 고유 번호',
    unsigned: true,
  })
  admin_no: number | null;

  @Column('varchar', { name: 'admin_id', nullable: true, length: 20 })
  admin_id: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 20 })
  password: string | null;

  @Column('varchar', {
    name: 'admin_class',
    nullable: true,
    comment: "'tester', 'admin', 'manager'",
    length: 20,
  })
  admin_class: string | null;

  @Column('varchar', { name: 'admin_name', nullable: true, length: 20 })
  admin_name: string | null;

  @Column('varchar', { name: 'mobile', nullable: true, length: 20 })
  mobile: string | null;

  @Column('char', { name: 'use_yn', nullable: true, length: 1 })
  use_yn: string | null;

  @Column('char', {
    name: 'start_date',
    nullable: true,
    comment: 'yyyy-MM-dd HH:mm:ss',
    length: 19,
  })
  start_date: string | null;

  @Column('char', {
    name: 'end_date',
    nullable: true,
    comment: 'yyyy-MM-dd HH:mm:ss',
    length: 19,
  })
  end_date: string | null;

  @Column('varchar', { name: 'user_desc', nullable: true, length: 50 })
  user_desc: string | null;
}
