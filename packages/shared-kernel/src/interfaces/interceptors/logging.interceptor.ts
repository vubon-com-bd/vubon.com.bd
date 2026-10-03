/**
 * Logging Interceptor
 * @module shared-kernel/interfaces/interceptors
 */
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOG_LEVEL } from '@vubon/shared-constants/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const started = Date.now();
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
    }>();

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - started;
          this.logger.log(`[${LOG_LEVEL.INFO}] ${req.method} ${req.url} — ${ms}ms`);
        },
        error: (err: unknown) => {
          const ms = Date.now() - started;
          this.logger.error(
            `[${LOG_LEVEL.ERROR}] ${req.method} ${req.url} — ${ms}ms`,
            err instanceof Error ? err.stack : undefined
          );
        },
      })
    );
  }
}
