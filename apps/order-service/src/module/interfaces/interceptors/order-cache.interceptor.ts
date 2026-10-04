/**
 * OrderCacheInterceptor — caches GET responses via RedisService
 * @module order-service/interfaces/interceptors
 *
 * Only applies to GET requests. Uses CACHE_TTL from shared constants.
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, type Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class OrderCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const http = context.switchToHttp();
    const req = http.getRequest<{ method: string; url: string; user?: { userId?: string } }>();

    if (req.method !== 'GET') {
      return next.handle();
    }

    const key = this.buildKey(req);

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) {
        return of(cached);
      }
    } catch {
      // cache miss on error — fall through to handler
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis.raw.set(
          key,
          JSON.stringify(data),
          'EX',
          CACHE_TTL.ONE_MINUTE,
        );
      }),
    );
  }

  private buildKey(req: { method: string; url: string; user?: { userId?: string } }): string {
    const userId = req.user?.userId ?? 'anon';
    return `order-cache:${userId}:${req.method}:${req.url}`;
  }
}
