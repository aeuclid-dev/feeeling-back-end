import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    console.log('View controller showHome!@!@');
    await this.viewService.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/scoring')
  public async scoringIndex(@Req() req: Request, @Res() res: Response) {
    await this.viewService.scoringIndexHandler(req, res, req.user);
  }
}
