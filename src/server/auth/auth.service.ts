import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hashSync } from 'bcrypt';
import { loginMemberDto } from '../repositorys/dtos/member.dto';
import { MemberRepository } from '../repositorys/member.repository';

@Injectable()
export class AuthService {
  constructor(
    private memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}
  async validateMember(loginMemberDto: loginMemberDto): Promise<any> {
    /*  type    0       1(k)    2(n)
      user_id user_id   sns_id  sns_id
      pwd     string    null    null
    */
    let memberObj: any = {};
    // console.log('call auth service validateMember..!');
    // console.log(loginMemberDto);
    if (loginMemberDto.type === 0) {
      memberObj.user_id = loginMemberDto.user_id;
      memberObj.pwd = loginMemberDto.pwd;
      const member = await this.memberRepository.findOne(memberObj);
      if (!member || (member && compare(loginMemberDto.pwd, member.pwd))) {
        // no-match
        console.log('no pwd or not regist member');
        return null;
      } else {
        return member;
      }
    } else {
      memberObj.sns_id = loginMemberDto.user_id;
      const snsMember = await this.memberRepository.findOne(memberObj);
      if (!snsMember) {
        // no-match
        console.log('no pwd or not regist member');
        return null;
      } else {
        return snsMember;
      }
    }
  }

  async login(loginMemberDto) {
    const payload = {
      user_no: loginMemberDto.user_no,
      id: loginMemberDto.user_id,
      type: loginMemberDto.type,
    };
    //console.log('auth services return token...');

    const token = this.jwtService.sign(payload);
    //  new Buffer(escape()).toString(
    //   'hex',
    // );
    return token;
  }
}
