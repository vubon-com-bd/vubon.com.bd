/**
 * PrismaUnavailableFilter — PrismaEngineUnavailableError → 503
 * @module logistics-service/infrastructure/filters
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaEngineUnavailableError } from '../persistence/prisma/prisma.service.js';

@Catch(PrismaEngineUnavailableError)
export class PrismaUnavailableFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaUnavailableFilter.name);

  catch(exception: PrismaEngineUnavailableError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(`[Prisma] ${exception.message} → HTTP 503`);
    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      success: false,
      error: {
        name: exception.name,
        code: exception.code,
        message: exception.message,
        httpStatus: exception.httpStatus,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
