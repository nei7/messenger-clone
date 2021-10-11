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

    if (!exception) {
      return response.status(500).json({
        error: 'Internal Server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    const error = exception.response?.message ?? exception.response;
    response.status(status).json({
      type: exception.name,
      message: exception.message,
      ...(Array.isArray(error) ? { errors: error } : { error }),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
