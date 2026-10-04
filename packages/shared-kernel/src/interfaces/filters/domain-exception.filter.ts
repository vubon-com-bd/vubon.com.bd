/**
 * Domain Exception Filter
 * @module shared-kernel/interfaces/filters
 *
 * Catches any error carrying a `code` and `httpStatus` field (Domain/Application error)।
 */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { json: (body: unknown) => void };
    }>();

    const err = exception as {
      code?: string;
      message?: string;
      httpStatus?: number;
      context?: unknown;
    };

    if (!err?.code || !err?.httpStatus) {
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
      return;
    }

    response.status(err.httpStatus).json({
      statusCode: err.httpStatus,
      code: err.code,
      message: err.message ?? 'Domain error',
      context: err.context,
      timestamp: new Date().toISOString(),
    });
  }
}
