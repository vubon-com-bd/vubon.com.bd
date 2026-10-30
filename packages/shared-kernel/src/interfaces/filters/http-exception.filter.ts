/**
 * HTTP Exception Filter
 * @module shared-kernel/interfaces/filters
 *
 * Captures HttpException with full response detail (validation errors, etc.)
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { json: (body: unknown) => void };
    }>();
    const request = ctx.getRequest<{ url?: string }>();
    const status = exception.getStatus() || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse();
    let message: unknown = exception.message;
    let details: unknown = undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resp = exceptionResponse as Record<string, unknown>;
      if (resp.message) {
        message = resp.message;
      }
      if (resp.errors) {
        details = resp.errors;
      }
    }

    response.status(status).json({
      statusCode: status,
      code: (exceptionResponse as Record<string, unknown>)?.code ?? 'SRV-001',
      message,
      details,
      timestamp: new Date().toISOString(),
      path: request?.url,
    });
  }
}
