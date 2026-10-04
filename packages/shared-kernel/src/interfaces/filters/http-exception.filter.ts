/**
 * HTTP Exception Filter
 * @module shared-kernel/interfaces/filters
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
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
