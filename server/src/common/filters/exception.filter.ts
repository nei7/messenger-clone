import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errors = exception?.response ? exception.response.message : null;

    if (!exception) {
      return response.status(500).json({
        error: 'Internal Server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    response.status(status).json({
      type: exception.name,
      message: exception.message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
