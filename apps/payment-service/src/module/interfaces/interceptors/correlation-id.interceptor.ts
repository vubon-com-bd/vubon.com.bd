/**
 * CorrelationIdInterceptor — propagates x-correlation-id header
 * @module payment-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { randomUUID } from 'node:crypto';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();
    const res = context.switchToHttp().getResponse<{
      setHeader: (key: string, value: string) => void;
    }>();

    const incoming = req.headers[CORRELATION_ID_HEADER];
    const id =
      typeof incoming === 'string' && incoming.length > 0
        ? incoming
        : randomUUID();

    res.setHeader(CORRELATION_ID_HEADER, id);
    return next.handle();
  }
}
