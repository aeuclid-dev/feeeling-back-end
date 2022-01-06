import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('tb_psy_char', { schema: 'feeeling' })
export class TbPsyChar {
  @PrimaryColumn('int', { name: 'psy_char_id' })
  psy_char_id: number | null;

  @Column('varchar', { name: 'psy_char_name', nullable: true, length: 50 })
  psy_char_name: string | null;

  @Column('varchar', { name: 'psy_char_code', nullable: true, length: 20 })
  psy_char_code: string | null;

  @Column('varchar', { name: 'psy_char_img', nullable: true, length: 30 })
  psy_char_img: string | null;

  @Column('varchar', { name: 'psy_char_desc', nullable: true, length: 50 })
  psy_char_desc: string | null;

  @Column('char', {
    name: 'use_yn',
    nullable: true,
    length: 1,
    default: () => "'Y'",
  })
  use_yn: string | null;
}
