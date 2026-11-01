/**
 * ApplicationExceptionFilter — maps ApplicationError → HTTP response
 * @module identity-service/interfaces/filters
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { HttpErrorTranslator } from '../errors/http-errors.js';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApplicationExceptionFilter.name);

  catch(exception: ApplicationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url: string }>();

    const mapped = HttpErrorTranslator.toResponse(exception, request.url);

    this.logger.warn(
      `Application error: ${exception.name} — ${exception.message}`,
    );

    response.status(mapped.statusCode).json(mapped);
  }
}
