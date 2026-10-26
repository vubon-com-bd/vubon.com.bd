/**
 * DeliveryTrackingInterceptor — logs send requests
 * @module notification-service/interfaces/interceptors
 *
 * Only tracks POST requests that create/send notifications।
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
export class DeliveryTrackingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(DeliveryTrackingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { userId?: string };
    }>();

    // Only track POST/PUT/PATCH (state changes)
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
      return next.handle();
    }

    const started = Date.now();
    const user = req.user?.userId ?? 'anon';

    return next.handle().pipe(
      tap({
        next: (result) => {
          const ms = Date.now() - started;
          this.logger.log(
            `📤 DELIVERY ${req.method} ${req.url} — ${ms}ms by=${user} result=${this.summarize(result)}`,
          );
        },
        error: (err: unknown) => {
          const ms = Date.now() - started;
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `⚠️  DELIVERY FAIL ${req.method} ${req.url} — ${ms}ms by=${user} err=${msg}`,
          );
        },
      }),
    );
  }

  private summarize(result: unknown): string {
    if (result === null || result === undefined) return 'null';
    if (typeof result !== 'object') return typeof result;
    const obj = result as Record<string, unknown>;
    if ('notificationIds' in obj && Array.isArray(obj['notificationIds'])) {
      return `ids=${obj['notificationIds'].length}`;
    }
    if ('id' in obj) return `id=${String(obj['id']).slice(0, 8)}`;
    return 'ok';
  }
}
