/**
 * Query Logging Interceptor
 * @module analytics-service/interfaces/interceptors
 *
 * Structured logging for analytics query endpoints.
 * Captures query name, duration, user, correlation ID.
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface RequestWithContext {
  readonly method?: string;
  readonly url?: string;
  readonly body?: unknown;
  readonly user?: { userId?: string };
  readonly correlationId?: string;
}

@Injectable()
export class QueryLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AnalyticsQuery');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithContext>();
    const started = Date.now();
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const userId = request.user?.userId ?? 'anonymous';
    const correlationId = request.correlationId ?? '-';

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - started;
          this.logger.log(
            `✅ [${correlationId}] ${controller}.${handler} | user=${userId} | ${ms}ms`
          );
        },
        error: (err: unknown) => {
          const ms = Date.now() - started;
          const message = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `❌ [${correlationId}] ${controller}.${handler} | user=${userId} | ${ms}ms | error=${message}`
          );
        },
      })
    );
  }
}
