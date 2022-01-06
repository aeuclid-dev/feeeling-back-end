import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      console.log(request.session);
      const result = request.isAuthenticated();
      console.log('----authguard----');
      console.log(result);
      if (result) {
        return result;
      } else {
        console.log('return main.');
        const response: Response = context.switchToHttp().getResponse();
        return response.status(302).redirect('/');
      }
    } catch (e) {
      console.log('----error from authguard!----');
      console.log(e);
    }
  }
}
