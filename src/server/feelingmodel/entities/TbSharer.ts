import { Column, Entity } from 'typeorm';

@Entity('tb_sharer', { schema: 'feeeling' })
export class TbSharer {
  @Column('int', {
    primary: true,
    name: 'user_no',
    comment: '공유해준 사람 - tb_user.user_no',
    unsigned: true,
  })
  user_no: number;

  @Column('int', {
    primary: true,
    name: 'sharer_no',
    comment: '공유받은 사람 - tb_user.user_no',
    unsigned: true,
  })
  sharer_no: number;
}
