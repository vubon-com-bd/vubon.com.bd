/**
 * Universal test exception filter
 * @module logistics-service/test/e2e
 *
 * Single deterministic filter for e2e tests. Extracts HTTP status from
 * the thrown error in this order:
 *   1. error.httpStatus              (DomainError / ApplicationError)
 *   2. error.response.statusCode     (HttpException — NestJS native shape)
 *   3. error.status                  (HttpException — variant)
 *   4. 500                           (fallback)
 */
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common';

interface MaybeError {
  httpStatus?: number;
  status?: number;
  code?: string;
  message?: string | string[];
  context?: unknown;
  response?: { statusCode?: number; message?: string | string[] } | string;
}

@Catch()
export class UniversalTestFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<{
      status: (n: number) => { json: (body: unknown) => void };
    }>();

    const e = (exception ?? {}) as MaybeError;

    let status = 500;
    let code: string | undefined;
    let message: string | string[] = 'Internal server error';
    let context: unknown;

    if (typeof e.httpStatus === 'number' && e.httpStatus >= 400 && e.httpStatus < 600) {
      status = e.httpStatus;
      code = e.code;
      message = e.message ?? 'Error';
      context = e.context;
    } else if (
      e.response &&
      typeof e.response === 'object' &&
      typeof e.response.statusCode === 'number'
    ) {
      status = e.response.statusCode;
      message = e.response.message ?? e.message ?? 'Error';
    } else if (
      typeof e.status === 'number' &&
      e.status >= 400 &&
      e.status < 600
    ) {
      status = e.status;
      message = e.message ?? 'Error';
    } else if (e.message) {
      message = e.message;
    }

    res.status(status).json({
      statusCode: status,
      code,
      message,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}
