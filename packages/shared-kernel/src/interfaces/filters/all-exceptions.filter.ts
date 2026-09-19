/**
 * All Exceptions Filter
 * @module shared-kernel/interfaces/filters
 *
 * Values আসে shared-constants/common থেকে।
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

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { json: (body: ErrorResponse) => void };
    }>();
    const request = ctx.getRequest<{ url?: string }>();

    // ✅ Explicit type annotations — literal type widening প্রতিরোধ
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let code: string = ERROR_CODE.SERVER_INTERNAL;
    let message: string = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as Record<string, unknown>;
        if (typeof obj.message === 'string') {
          message = obj.message;
        }
        if (typeof obj.code === 'string') {
          code = obj.code;
        }
      }
    } else if (exception instanceof Error) {
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
