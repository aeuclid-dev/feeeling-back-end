import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from '../repositorys/member.repository';
import { TbUser as member } from '../feelingmodel/entities/TbUser';

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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: 'Aeuclid2021',
      ignoreExpiration: false,
    });
  }
  //super({
  //  jwtFromRequest: fromAuthHeader(),

  // async validate(payload: any) {
  //   const user_id = payload.user_id;
  //   console.log('jwt strategy in auth module');
  //   console.log(payload);
  //   const member: member = await this.memberRepository.findOne({ user_id });
  //   if (!member) {
  //     console.log('not exist member...');
  //     throw new UnauthorizedException();
  //   }
  //   return member;
  // }

  async validate(payload: any) {
    console.log('token valudate...');
    const member_id = payload.id;
    const user_no = payload.user_no;
    const type = payload.type;
    let checkUser: any = {
      type: type,
      user_no: user_no,
    };
    if (type === 0) {
      checkUser.user_id = member_id;
    } else {
      checkUser.sns_id = member_id;
    }

    const member: member = await this.memberRepository.findOne(checkUser);
    if (!member) {
      console.log('not exist member...');
      throw new UnauthorizedException();
    }
    return member;
  }
}
