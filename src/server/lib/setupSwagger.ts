import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MemberModule } from '../member/member.module';
import { ImageDownloadModule } from '../image-download/image-download.module';
import { TestModule } from '../test/test.module';
import { CommonModule } from '../common/common.module';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .addApiKey(
      {
        type: 'apiKey',
        name: 'token',
        in: 'header',
        description: 'insert user auth_token',
      },
      'token',
    )
    .setTitle('Feeeling API Docs')
    .setDescription(
      'Feeeling API for FeeelingApplication<br>padlock Icon API need token from header<br>response :{<br>&nbsp;&nbsp;resultData:data,<br>&nbsp;&nbsp;result:{<br>&nbsp;&nbsp;&nbsp;&nbsp;status:"응답코드",<br>&nbsp;&nbsp;&nbsp;&nbsp;message:"응답메시지",<br>&nbsp;&nbsp;}<br>}',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [MemberModule, ImageDownloadModule, TestModule, CommonModule],
  });

  //all api just for show. no try
  //can't each api disable.
  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  });
}
