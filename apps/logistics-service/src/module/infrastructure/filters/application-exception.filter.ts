/**
 * ApplicationExceptionFilter — ApplicationError → HTTP
 * @module logistics-service/infrastructure/filters
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApplicationExceptionFilter.name);

  catch(exception: ApplicationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.httpStatus ?? HttpStatus.BAD_REQUEST;
    this.logger.warn(`[Application] ${exception.name}: ${exception.message} → HTTP ${status}`);
    response.status(status).json({
      success: false,
      error: exception.toJSON(),
      timestamp: new Date().toISOString(),
    });
  }
}
