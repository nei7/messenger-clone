import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ErrorFilter } from './common/filters/exception.filter';
import { AppModule } from './modules/app/app.module';
import * as dotenv from 'dotenv';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

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

  await app.listen(3000);
}
bootstrap();
