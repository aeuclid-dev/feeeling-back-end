import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { join } from 'path';

import session = require('express-session');
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
//import * as passport from 'passport';
import passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //const sessionTime = 60 * 60 * 1000; //ms 1hour-set //211129
  const sessionTime = 3 * 60 * 60 * 1000; //3min
  app.use(
    session({
      secret: 'Aeuclid2021',
      resave: false,
      saveUninitialized: true,
      // cookie: {
      //   maxAge: sessionTime,
      //   expires: new Date(Date.now() + sessionTime),
      // },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(80);
}
bootstrap();
