/**
 * LogisticsExceptionFilter — global catch-all exception filter.
 *
 * Uses DUCK-TYPING (not `instanceof HttpException`) so it works even when
 * two different copies of @nestjs/common exist in the monorepo tree —
 * otherwise a guard's UnauthorizedException from copy A would be re-thrown
 * as 500 by the filter that checks `instanceof` against copy B.
 *
 * Maps:
 *   1. Duck-typed HttpException (has .getStatus() + .getResponse()) → native status
 *   2. Domain/Application errors (has .httpStatus + .message)       → native status + code
 *   3. Prisma init / engine-unavailable errors                       → 503 Service Unavailable
 *   4. Everything else                                               → 500
 */
import {
  ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger,
} from '@nestjs/common';
import type { Response } from 'express';

interface HttpExceptionLike {
  getStatus: () => number;
  getResponse: () => unknown;
  message?: string;
}
interface DomainErrorLike {
  httpStatus: number;
  code?: string;
  message: string;
  context?: unknown;
}

function isHttpExceptionLike(x: unknown): x is HttpExceptionLike {
  return (
    typeof x === 'object' &&
    x !== null &&
    'getStatus' in x &&
    typeof (x as HttpExceptionLike).getStatus === 'function' &&
    'getResponse' in x &&
    typeof (x as HttpExceptionLike).getResponse === 'function'
  );
}

function isDomainErrorLike(x: unknown): x is DomainErrorLike {
  return (
    typeof x === 'object' &&
    x !== null &&
    'httpStatus' in x &&
    typeof (x as { httpStatus: unknown }).httpStatus === 'number' &&
    'message' in x &&
    typeof (x as { message: unknown }).message === 'string'
  );
}

@Catch()
export class LogisticsExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionsHandler');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ url?: string; method?: string }>();

    // 1) HttpException-like (duck-typed) → preserve its own status
    if (isHttpExceptionLike(exception)) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      const payload =
        typeof body === 'string'
          ? { statusCode: status, message: body }
          : (body as Record<string, unknown>);

      if (status >= 500) {
        this.logger.error(
          `${request.method ?? 'GET'} ${request.url ?? ''} → ${status}`,
          exception instanceof Error ? exception.stack : undefined,
        );
      } else {
        this.logger.warn(`${request.method ?? 'GET'} ${request.url ?? ''} → ${status}`);
      }
      response.status(status).json(payload);
      return;
    }

    // 2) Domain / Application error shape
    if (isDomainErrorLike(exception)) {
      this.logger.warn(
        `${request.method ?? 'GET'} ${request.url ?? ''} → ${exception.httpStatus} ${exception.code ?? ''}`,
      );
      response.status(exception.httpStatus).json({
        statusCode: exception.httpStatus,
        code: exception.code,
        message: exception.message,
        context: exception.context,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // 3) Prisma engine unavailable (Termux ARM64 etc.) → 503 instead of 500
    const msg = exception instanceof Error ? exception.message : String(exception);
    if (
      msg.includes('PrismaClientInitializationError') ||
      msg.includes('Prisma engines do not seem to be compatible') ||
      msg.includes('libquery_engine') ||
      msg.includes('Unable to require')
    ) {
      this.logger.warn(
        `${request.method ?? 'GET'} ${request.url ?? ''} → 503 (Prisma engine unavailable)`,
      );
      response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        code: 'INFRA_PRISMA_ENGINE_UNAVAILABLE',
        message:
          'Database engine unavailable on this host. Endpoints that require persistence are temporarily unavailable.',
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // 4) Fallback → 500
    this.logger.error(
      `${request.method ?? 'GET'} ${request.url ?? ''} → 500`,
      exception instanceof Error ? exception.stack : undefined,
    );
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
