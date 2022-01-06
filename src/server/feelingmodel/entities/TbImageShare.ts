import { Column, Entity } from 'typeorm';

@Entity('tb_image_share', { schema: 'feeeling' })
export class TbImageShare {
  @Column('bigint', {
    primary: true,
    name: 'image_no',
    comment: '이미지 no - tb_image.image_no',
    unsigned: true,
  })
  image_no: string;

  @Column('int', {
    primary: true,
    name: 'sharer_no',
    comment: '공유받은 사람 - tb_sharer.sharer_no',
    unsigned: true,
  })
  sharer_no: number;
}
