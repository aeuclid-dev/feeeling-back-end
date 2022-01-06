import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminLoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('1');
    //check userid,pwd
    await super.canActivate(context);
    console.log('2 ok ');
    //initialize session

    console.log('admin login Guard');
    const request = context.switchToHttp().getRequest() as boolean;
    try {
      await super.logIn(context.switchToHttp().getRequest());
      console.log('admin login Guard try ok');
      return request;
    } catch (e) {
      console.log('admin login Guard try fail');
      console.log(e);
      return null;
    }
  }
}
