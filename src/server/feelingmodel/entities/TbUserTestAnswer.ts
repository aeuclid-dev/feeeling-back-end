import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('test_req_no', ['test_req_no'], {})
@Entity('tb_user_test_answer', { schema: 'feeeling' })
export class TbUserTestAnswer {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_answer_no',
    unsigned: true,
  })
  user_answer_no: string;

  @Column('bigint', {
    name: 'test_req_no',
    comment: '검사 요청 번호  tb_test_request.test_req_no',
    unsigned: true,
    default: () => "'0'",
  })
  test_req_no: string;

  @Column('int', {
    name: 'user_no',
    comment: '사용자 번호  tb_user.user_no',
    unsigned: true,
    default: () => "'0'",
  })
  user_no: number;

  @Column('tinyint', {
    name: 'test_id',
    comment: '검사 종류',
    unsigned: true,
    default: () => "'0'",
  })
  test_id: number;

  @Column('int', {
    name: 'question_no',
    comment: '질문 번호: tb_question.question_no',
    unsigned: true,
    default: () => "'0'",
  })
  question_no: number;

  @Column('int', {
    name: 'answer_no',
    comment: '답변 번호: tb_answer.answer_no',
    unsigned: true,
    default: () => "'0'",
  })
  answer_no: number;

  @Column('varchar', {
    name: 'answer',
    comment: '주관식 / 기타 답변',
    length: 100,
    default: () => "''",
  })
  answer: string;

  @Column('bigint', {
    name: 'reg_time',
    comment: '등록시각 UTC - UNIX TIMESTAMP',
    unsigned: true,
    default: () => "'0'",
  })
  reg_time: string;
}
