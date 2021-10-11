import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ErrorFilter } from './filters/exception.filter';
import { AppModule } from './modules/app/app.module';
import * as dotenv from 'dotenv';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new ErrorFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException(
          errors.map((error) => ({
            path: error.property,
            error: Object.values(error.constraints)[0],
          })),
        );
      },
    }),
  );
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('messenger-clone API')
    .setDescription('messenger clone API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
