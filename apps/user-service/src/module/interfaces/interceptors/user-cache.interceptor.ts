/**
 * UserCacheInterceptor — caches GET responses for /users/* routes
 * @module user-service/interfaces/interceptors
 *
 * Cache key = method + path. Cache TTL from CACHE_TTL constants.
 * Errors never cached (best-effort cache).
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import type { Request } from 'express';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

interface CacheableRequest extends Request {
  method: string;
  originalUrl: string;
}

@Injectable()
export class UserCacheInterceptor implements NestInterceptor {
  private static readonly PREFIX = 'user:http:';
  private static readonly TTL = CACHE_TTL.FIVE_MINUTES;

  constructor(private readonly redis: RedisService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<CacheableRequest>();

    // Only cache GET
    if (request.method !== 'GET') {
      return next.handle();
    }

    const cacheKey = `${UserCacheInterceptor.PREFIX}${request.originalUrl}`;

    return from(this.redis.get<unknown>(cacheKey)).pipe(
      switchMap((cached) => {
        if (cached !== null && cached !== undefined) {
          return of(cached);
        }
        return next.handle().pipe(
          tap((data) => {
            // Fire-and-forget cache set
            void this.redis
              .set(cacheKey, data, UserCacheInterceptor.TTL)
              .catch(() => undefined);
          })
        );
      })
    );
  }
}
