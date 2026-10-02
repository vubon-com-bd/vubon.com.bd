/**
 * CartCacheInterceptor — caches GET cart responses
 * @module cart-service/interfaces/interceptors
 */
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class CartCacheInterceptor implements NestInterceptor {
  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{ method: string; url: string }>();
    if (req.method !== 'GET') return next.handle();

    const key = `cart:http:${req.url}`;

    return of(null).pipe(
      mergeMapWithCache(this.redis, key, next),
    );
  }
}

function mergeMapWithCache(
  redis: RedisService,
  key: string,
  next: CallHandler,
) {
  return (source: Observable<unknown>) =>
    source.pipe(
      mergeMap(async () => {
        try {
          const cached = await redis.get<unknown>(key);
          if (cached) return cached;
        } catch { /* ignore */ }
        return undefined;
      }),
      mergeMap((cached) => {
        if (cached !== undefined) return of(cached);
        return next.handle().pipe(
          tap(async (value) => {
            try {
              await redis.set(key, value, CACHE_TTL.FIVE_MINUTES);
            } catch { /* ignore */ }
          }),
        );
      }),
    );
}

// Local re-import to avoid extra top-level import
import { mergeMap } from 'rxjs/operators';
