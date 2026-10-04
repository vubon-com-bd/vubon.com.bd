/**
 * SearchCacheInterceptor — caches search query responses.
 * @module product-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export const SEARCH_CACHE_INTERCEPTOR = Symbol('SEARCH_CACHE_INTERCEPTOR');

@Injectable()
export class SearchCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(RedisService) private readonly redis: RedisService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<{
      method?: string;
      originalUrl?: string;
    }>();

    if (req.method !== 'GET' || !req.originalUrl) {
      return next.handle();
    }

    const key = `http:search:${req.originalUrl}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) return of(cached);

    return next.handle().pipe(
      tap((data) => {
        void this.redis.set(key, data, CACHE_TTL.FIVE_MINUTES);
      }),
    );
  }
}
