/**
 * AuthCacheInterceptor — Redis-backed GET caching
 * @module identity-service/interfaces/interceptors
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

const PREFIX = 'auth-http-cache:';

interface CacheRequest {
  method: string;
  url: string;
  user?: { userId?: string };
}

@Injectable()
export class AuthCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<CacheRequest>();
    if (req.method !== 'GET') return next.handle();

    const key = this.buildKey(req);

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) return of(cached);
    } catch {
      /* cache miss */
    }

    return next.handle().pipe(
      tap((data) => {
        try {
          void this.redis.set(key, data, CACHE_TTL.ONE_MINUTE);
        } catch {
          /* ignore cache write failure */
        }
      }),
    );
  }

  private buildKey(req: CacheRequest): string {
    const userId = req.user?.userId ?? 'anon';
    return `${PREFIX}${userId}:${req.method}:${req.url}`;
  }
}
