import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TbQuestion as question } from './TbQuestion';

@Index('question_no', ['question_no'], {})
@Entity('tb_answer', { schema: 'feeeling' })
export class TbAnswer {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'answer_no',
    comment: '보기 번호',
    unsigned: true,
  })
  answer_no: number;

  @Column('int', {
    name: 'question_no',
    comment: '질문 번호(키)          tb_question.question_no',
    unsigned: true,
    default: () => "'0'",
  })
  question_no: number;

  @Column('tinyint', {
    name: 'order_no',
    comment: '보기 넘버',
    unsigned: true,
    default: () => "'0'",
  })
  order_no: number;

  @Column('varchar', {
    name: 'answer',
    comment: '보기(답변) 내용',
    length: 100,
    default: () => "''",
  })
  answer: string;

  @Column('tinyint', {
    name: 'type',
    comment: '0: 객관식, 1: 주관식',
    unsigned: true,
    default: () => "'0'",
  })
  type: number;

  @Column('int', {
    name: 'next_question_no',
    comment:
      '보기 선택시 연결된 다음 질문 no   tb_question.question_no\r\n\r\n9999 인 경우 주관식 답변 요구',
    unsigned: true,
    default: () => "'0'",
  })
  next_question_no: number;

  @ManyToOne((type) => question, (question) => question.answers)
  @JoinColumn({ name: 'question_no' })
  question: question;
}
