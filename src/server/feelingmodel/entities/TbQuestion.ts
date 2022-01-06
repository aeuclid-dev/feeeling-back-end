import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbAnswer as answer } from './TbAnswer';

@Index('test_id_lang', ['test_id', 'lang'], {})
@Entity('tb_question', { schema: 'feeeling' })
export class TbQuestion {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'question_no',
    comment: '질문 고유 키',
    unsigned: true,
  })
  question_no: number;

  @Column('varchar', {
    name: 'test_id',
    comment: 'tb_test.test_id',
    length: 10,
    default: () => "''",
  })
  test_id: string;

  @Column('tinyint', {
    name: 'order_no',
    comment: '질문 번호',
    unsigned: true,
    default: () => "'0'",
  })
  order_no: number;

  @Column('varchar', {
    name: 'question',
    comment: '질문 내용',
    length: 100,
    default: () => "''",
  })
  question: string;

  @Column('char', {
    name: 'lang',
    comment: '언어코드   kor, eng, chn, jpn, ...',
    length: 3,
    default: () => "''",
  })
  lang: string;

  @OneToMany((type) => answer, (answer) => answer.question)
  @JoinColumn({ name: 'question_no' })
  answers: answer[];
}
