import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeToKorMsg } from '../common/errorcode.config';
import { ReturnResult } from '../common/return.result';
import { AdminRepository } from '../repositorys/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private AdminRepository: AdminRepository,
  ) {}

  async AdminLogin(data): Promise<object> {
    const result = new ReturnResult();
    // console.log('admin service');
    // console.log(data);

    try {
      const adminuser = await this.AdminRepository.find({
        admin_id: data.userid,
        password: data.password,
        use_yn: 'Y',
      });

      if (adminuser.length > 0) {
        result.status = '000';
        result.message = ErrorCodeToKorMsg('000');
        const returnResult = {
          loginSuccess: true,
          data: adminuser,
          result: result,
        };
        return returnResult;
      } else {
        result.status = '221';
        result.message = ErrorCodeToKorMsg('221');
        const returnResult = {
          loginSuccess: false,
          data: '',
          result: result,
        };
        return returnResult;
      }
    } catch (e) {
      console.log(e);
      result.status = e.code;
      result.message = ErrorCodeToKorMsg(e.code);
      const returnResult = {
        loginSuccess: false,
        result: result,
      };
      return returnResult;
    }
  }
}
