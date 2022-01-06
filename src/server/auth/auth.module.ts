import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from '../repositorys/admin.repository';
import { MemberModule } from '../member/member.module';
import { MemberRepository } from '../repositorys/member.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'Aeuclid2021',
      signOptions: {
        expiresIn: 60 * 60 * 24 * 30,
      },
    }),
    TypeOrmModule.forFeature([MemberRepository, AdminRepository]),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, SessionSerializer],
  exports: [PassportModule, AuthService, JwtModule],
})
export class AuthModule {}
