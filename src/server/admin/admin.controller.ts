import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { AdminLoginGuard } from '../auth/adminLogin.guard';

@Controller('admin')
export class AdminController {
  constructor(private AdminService: AdminService) {}

  // @Post('/login')
  // ALogin(@Res() res: Response) {
  //   // console.log('call admin from login');
  //   // console.log(body);

  //   // return this.AdminService.AdminLogin(body);
  //   let date = new Date();
  //   let rdurl = '/scoring?date=' + date.valueOf();
  //   res.redirect(rdurl);
  // }

  @UseGuards(AdminLoginGuard)
  @Post('/login')
  AdminLogin(@Res() res: Response, @Req() req) {
    // console.log('okok');
    // console.log(req.user);

    //return req.user;
    let returnObj: any = {};
    if (req.user !== undefined) {
      console.log('ok send');
      returnObj.loginSuccess = true;
    } else {
      console.log('no');
      returnObj.loginSuccess = false;
    }
    return res.status(201).send(returnObj);
  }
}
