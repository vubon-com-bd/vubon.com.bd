/**
 * VendorCacheInterceptor — Redis-backed GET caching for vendor endpoints
 * @module vendor-service/interfaces/interceptors
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

const PREFIX = 'vendor-http-cache:';
const TTL_SECONDS = 60;

@Injectable()
export class VendorCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { userId?: string };
    }>();

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
        void this.redis.set(key, data, TTL_SECONDS);
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
}
