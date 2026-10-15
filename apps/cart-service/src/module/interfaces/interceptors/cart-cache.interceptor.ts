/**
 * CartCacheInterceptor — Redis-backed GET caching (user-scoped)
 * @module cart-service/interfaces/interceptors
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

const PREFIX = 'cart-service:http-cache:';

@Injectable()
export class CartCacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CartCacheInterceptor.name);

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

    // Only cache GET requests
    if (req.method !== 'GET') return next.handle();

    const key = this.buildKey(req);

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) {
        this.logger.debug(`Cache HIT: ${key}`);
        return of(cached);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Cache read failed: ${msg.slice(0, 100)}`);
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis
          .set(key, data, CACHE_TTL.ONE_MINUTE)
          .then(() => this.logger.debug(`Cache SET: ${key}`))
          .catch((err: unknown) => {
            const msg = err instanceof Error ? err.message : 'unknown';
            this.logger.warn(`Cache write failed: ${msg.slice(0, 100)}`);
          });
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
