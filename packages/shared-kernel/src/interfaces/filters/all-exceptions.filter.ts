/**
 * All Exceptions Filter
 * @module shared-kernel/interfaces/filters
 *
 * Values আসে shared-constants/common থেকে।
 *
 * Order of detection:
 *  1. HttpException  — NestJS built-in (400, 401, etc.)
 *  2. DomainError    — application/domain errors with `httpStatus` + `code`
 *  3. Error          — generic JS errors → 500
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { HTTP_STATUS, ERROR_CODE } from '@vubon/shared-constants/common';

interface ErrorResponse {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly timestamp: string;
  readonly path?: string;
}

interface DomainErrorShape {
  readonly httpStatus: number;
  readonly code?: string;
  readonly message: string;
}

function isDomainErrorLike(value: unknown): value is DomainErrorShape {
  return (
    typeof value === 'object' &&
    value !== null &&
    'httpStatus' in value &&
    typeof (value as { httpStatus: unknown }).httpStatus === 'number' &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { json: (body: ErrorResponse) => void };
    }>();
    const request = ctx.getRequest<{ url?: string }>();

    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let code: string = ERROR_CODE.SERVER_INTERNAL;
    let message: string = 'Internal server error';

    if (exception instanceof HttpException) {
      // 1) NestJS built-in HTTP exception
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as Record<string, unknown>;
        if (typeof obj.message === 'string') message = obj.message;
        if (typeof obj.code === 'string') code = obj.code;
      }
    } else if (isDomainErrorLike(exception)) {
      // 2) DomainError / ApplicationError — they carry `httpStatus`
      statusCode = exception.httpStatus;
      message = exception.message;
      if (typeof exception.code === 'string') code = exception.code;
      this.logger.warn(`Domain error: ${statusCode} ${code} — ${message}`);
    } else if (exception instanceof Error) {
      // 3) Generic error → 500
      message = exception.message;
      this.logger.error(exception.stack ?? exception.message);
    }

    response.status(statusCode).json({
      statusCode,
      code,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
