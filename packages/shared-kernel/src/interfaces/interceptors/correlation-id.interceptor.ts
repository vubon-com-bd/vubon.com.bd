/**
 * Correlation ID Interceptor
 * @module shared-kernel/interfaces/interceptors
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { generateUuid } from '@vubon/shared-utils/infrastructure';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
    }>();
    const response = context.switchToHttp().getResponse<{
      setHeader: (key: string, value: string) => void;
    }>();

    const correlationId = request.headers[CORRELATION_ID_HEADER] ?? generateUuid();

    response.setHeader(CORRELATION_ID_HEADER, correlationId);
    return next.handle();
  }
}
