import { EntityRepository, getRepository, Repository } from 'typeorm';

import { TbPublicPosting as publicPosting } from '../feelingmodel/entities/TbPublicPosting';

@EntityRepository(publicPosting)
export class PublicPostingRepository extends Repository<publicPosting> {
  // async getNoticeLists(myobj): Promise<object> {
  //   const get_notice_list = await getRepository(publicPosting)
  //     .createQueryBuilder('tb_public_posting')
  //     .select([
  //       'tb_public_posting.posting_title as title',
  //       'tb_public_posting.posting_contents as contents',
  //       'tb_public_posting.reg_datetime as regtime',
  //     ]) // added selection
  //     .where('tb_public_posting.status = 0');
  //   // if (
  //   //   myobj.start !== undefined &&
  //   //   myobj.start > 0 &&
  //   //   myobj.end !== undefined &&
  //   //   myobj.end > 0
  //   // ) {
  //   //   get_user_test_list.andWhere(
  //   //     'tb_test_request.test_time BETWEEN :start AND :end',
  //   //     { start: myobj.start, end: myobj.end },
  //   //   );
  //   // }
  //   // if (
  //   //   myobj.status !== undefined &&
  //   //   (myobj.status === 0 || myobj.status === 1)
  //   // ) {
  //   //   get_user_test_list.andWhere('tb_test_request.status = :status', {
  //   //     nickname: myobj.status,
  //   //   });
  //   // }
  //   get_notice_list
  //     .orderBy('tb_public_posting.posting_no', 'DESC')
  //     .limit(myobj.count)
  //     .offset(myobj.pos);
  //   return get_notice_list.getRawMany();
  // }
}
