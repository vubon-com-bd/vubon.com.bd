/**
 * DomainExceptionFilter — maps DomainError → HTTP response
 * @module identity-service/interfaces/filters
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { HttpErrorTranslator } from '../errors/http-errors.js';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url: string }>();

    const mapped = HttpErrorTranslator.toResponse(exception, request.url);

    this.logger.warn(
      `Domain error: ${exception.name} — ${exception.message}`,
    );

    response.status(mapped.statusCode).json(mapped);
  }
}
