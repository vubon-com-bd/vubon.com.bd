/**
 * OrderCacheInterceptor — Redis-backed GET caching
 * @module order-service/interfaces/interceptors
 *
 * Behavior:
 *  - In dev/test (DISABLE_AUTH=true or DB_MODE=memory) → skip cache entirely
 *  - Production (prisma mode):
 *      * GET requests → cache with 60s TTL
 *      * POST/PATCH/DELETE → invalidate list caches
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
import { IS_MEMORY_MODE } from '../../infrastructure/config/db-mode.config.js';

const PREFIX = 'order-http-cache:';

@Injectable()
export class OrderCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    // Skip cache in dev/test environment (memory mode or DISABLE_AUTH)
    if (
      IS_MEMORY_MODE ||
      process.env['DISABLE_AUTH'] === 'true' ||
      process.env['NODE_ENV'] !== 'production'
    ) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { userId?: string };
    }>();

    // Non-GET: pass through, invalidate related GET caches
    if (req.method !== 'GET') {
      return next.handle().pipe(
        tap(() => {
          void this.invalidateAll().catch(() => {});
        }),
      );
    }

    // GET: cache logic
    const key = this.buildKey(req);

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) return of(cached);
    } catch {
      /* cache miss */
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis.raw
          .set(key, JSON.stringify(data), 'EX', CACHE_TTL.ONE_MINUTE)
          .catch(() => {});
      }),
    );
  }

  private buildKey(req: {
    method: string;
    url: string;
    user?: { userId?: string };
  }): string {
    const userId = req.user?.userId ?? 'anon';
    return `${PREFIX}${userId}:${req.method}:${req.url}`;
  }

  private async invalidateAll(): Promise<void> {
    try {
      const keys = await this.redis.raw.keys(`${PREFIX}*`);
      if (keys.length > 0) {
        await this.redis.raw.del(...keys);
      }
    } catch {
      /* ignore */
    }
  }
}
