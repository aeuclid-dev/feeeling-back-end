import { Injectable, OnModuleInit } from '@nestjs/common';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { Request, Response } from 'express';
import { NextUrlWithParsedQuery } from 'next/dist/server/request-meta';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  constructor() {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: true,
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }
  scoringIndexHandler(req: Request, res: Response, user: any) {
    //console.log(user.admin_name);
    // res.json({
    //   admin_name: user.admin_name,
    //   title: 'feeelingScoringTestRequestPage',
    // });

    return this.server.getRequestHandler()(req, res);
  }
}
