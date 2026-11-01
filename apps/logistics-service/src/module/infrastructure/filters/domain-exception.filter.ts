/**
 * DomainExceptionFilter — DomainError → HTTP
 * @module logistics-service/infrastructure/filters
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.httpStatus ?? HttpStatus.BAD_REQUEST;
    this.logger.warn(`[Domain] ${exception.name}: ${exception.message} → HTTP ${status}`);
    response.status(status).json({
      success: false,
      error: exception.toJSON(),
      timestamp: new Date().toISOString(),
    });
  }
}
