/**
 * HttpExceptionFilter — HTTP-level exception → JSON response
 * @module logistics-service/interfaces/filters
 *
 * ⚠️ Interface-layer wrapping for HttpException.
 * ⚠️ Kernel filter handles DomainError; this handles raw HttpException.
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();

    this.logger.warn(`[HTTP] ${status}: ${exception.message}`);

    const errorBody =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, unknown>);

    response.status(status).json({
      success: false,
      error: {
        ...errorBody,
        statusCode: status,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
