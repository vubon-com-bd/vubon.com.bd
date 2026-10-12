/**
 * VendorCacheInterceptor — caches GET responses for vendor endpoints
 * @module vendor-service/interfaces/interceptors
 *
 * Uses shared RedisService; different TTL for public vs private paths.
 */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class VendorCacheInterceptor implements NestInterceptor {
  private readonly prefix = 'vendor:http:';

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { userId: string };
    }>();

    if (req.method !== 'GET') return next.handle();

    // Skip caching when user is authenticated (vary by user)
    if (req.user) return next.handle();

    const key = `${this.prefix}${req.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null && cached !== undefined) {
      return of(cached);
    }

    const ttl = req.url.includes('/public/') ? CACHE_TTL.FIVE_MINUTES : CACHE_TTL.ONE_MINUTE;

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, ttl);
      }),
    );
  }
}
