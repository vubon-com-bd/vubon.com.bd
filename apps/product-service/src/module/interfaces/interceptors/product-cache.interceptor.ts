/**
 * ProductCacheInterceptor — Redis-backed GET caching
 * @module product-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { of, type Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'product-http-cache:';

@Injectable()
export class ProductCacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ProductCacheInterceptor.name);

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
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.debug(`Cache lookup miss: ${msg.slice(0, 80)}`);
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis
          .set(key, data, CACHE_TTL.ONE_MINUTE)
          .catch(() => undefined);
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
