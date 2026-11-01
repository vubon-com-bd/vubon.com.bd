/**
 * Validation Exception Filter
 * @module shared-kernel/interfaces/filters
 */
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { HTTP_STATUS, ERROR_CODE } from '@vubon/shared-constants/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { json: (body: unknown) => void };
    }>();

    const res = exception.getResponse();
    const details =
      typeof res === 'object' && res !== null
        ? (res as Record<string, unknown>)
        : { message: String(res) };

    response.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: ERROR_CODE.VAL_REQUIRED,
      message: 'Validation failed',
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
