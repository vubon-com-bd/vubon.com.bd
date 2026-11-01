/**
 * CacheInterceptor — Redis-backed GET caching
 * @module logistics-service/interfaces/interceptors
 *
 * ⚠️ GET-only. User-scoped cache key. Silent fail on Redis down.
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

const PREFIX = 'logistics-http-cache:';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { sub?: string; userId?: string };
    }>();

    if (req.method !== 'GET') return next.handle();

    const key = this.buildKey(req);

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) return of(cached);
    } catch {
      /* cache miss — silent */
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

  private buildKey(req: {
    method: string;
    url: string;
    user?: { sub?: string; userId?: string };
  }): string {
    const uid = req.user?.sub ?? req.user?.userId ?? 'anon';
    return `${PREFIX}${uid}:${req.method}:${req.url}`;
  }
}
