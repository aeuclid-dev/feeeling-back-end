import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '../repositorys/admin.repository';
import { TbAdmin as admin } from '../feelingmodel/entities/TbAdmin';

const fromAuthHeader = function () {
  return function (request) {
    let token = null;
    if (request && request.header) {
      token = request.header['Authorization'];
    }
    return token;
  };
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
  ) {
    super({
      usernameField: 'userid',
      passwordField: 'password',
    });
  }

  async validate(userid: string, password: string) {
    const adminuser = await this.adminRepository.findOne({
      admin_id: userid,
      password: password,
      use_yn: 'Y',
    });

    if (!adminuser) {
      console.log('not exist member...');
      // throw new UnauthorizedException();
      return false;
    }

    return adminuser;
  }
}
