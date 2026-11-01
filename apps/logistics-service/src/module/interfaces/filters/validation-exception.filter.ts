/**
 * ValidationExceptionFilter — BadRequestException with validation details
 * @module logistics-service/interfaces/filters
 *
 * ⚠️ Extracts class-validator messages into clean { field, message } shape.
 * ⚠️ Duck-types ZodError (never use instanceof — cross-package mismatch).
 */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

interface ValidationErrorDetail {
  readonly field: string;
  readonly message: string;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();

    const details: ValidationErrorDetail[] = [];
    let mainMessage = exception.message;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resp = exceptionResponse as {
        message?: string | string[];
        error?: string;
      };
      if (Array.isArray(resp.message)) {
        for (const msg of resp.message) {
          const field = this.extractField(msg);
          details.push({ field: field ?? 'unknown', message: msg });
        }
        mainMessage = 'Validation failed';
      } else if (typeof resp.message === 'string') {
        mainMessage = resp.message;
      }
    }

    this.logger.warn(`[Validation] ${mainMessage} (${details.length} errors)`);

    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      error: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: mainMessage,
        details: details.length > 0 ? details : undefined,
      },
      timestamp: new Date().toISOString(),
    });
  }

  private extractField(message: string): string | undefined {
    // class-validator messages typically start with field name
    const match = message.match(/^(\w+)\s/);
    return match?.[1];
  }
}
