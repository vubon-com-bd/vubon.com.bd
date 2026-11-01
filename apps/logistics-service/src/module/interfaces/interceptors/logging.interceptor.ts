/**
 * LoggingInterceptor — structured per-request logging
 * @module logistics-service/interfaces/interceptors
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

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Request');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { sub?: string; userId?: string };
    }>();
    const started = Date.now();
    const controller = context.getClass().name;
    const handler = context.getHandler().name;

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - started;
          const uid = req.user?.sub ?? req.user?.userId ?? 'anon';
          this.logger.log(
            `${controller}.${handler} ${req.method} ${req.url} — ${ms}ms user=${uid}`,
          );
        },
        error: (err: unknown) => {
          const ms = Date.now() - started;
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `${controller}.${handler} ${req.method} ${req.url} — ${ms}ms ERROR=${msg}`,
          );
        },
      }),
    );
  }
}
