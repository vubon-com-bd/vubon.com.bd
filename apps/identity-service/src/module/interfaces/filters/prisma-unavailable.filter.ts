/**
 * PrismaUnavailableFilter — maps Prisma degraded errors to 503
 * @module identity-service/interfaces/filters
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { PrismaEngineUnavailableError } from '../../infrastructure/persistence/prisma/prisma.service.js';

@Catch(PrismaEngineUnavailableError)
export class PrismaUnavailableFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaUnavailableFilter.name);

  catch(exception: PrismaEngineUnavailableError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url: string; method: string }>();

    this.logger.warn(
      `Prisma unavailable: ${request.method} ${request.url}`,
    );

    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      success: false,
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      code: 'PRISMA_ENGINE_UNAVAILABLE',
      message: 'Database unavailable on this platform (degraded mode)',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
