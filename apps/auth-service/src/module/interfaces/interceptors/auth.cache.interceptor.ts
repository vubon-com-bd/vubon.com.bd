import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

@Injectable()
export class AuthCacheInterceptor implements NestInterceptor {
  private readonly store = new Map<string, CacheEntry>();

  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string; user?: { userId?: string } }>();

    if (request.method !== 'GET' || !request.user?.userId) {
      return next.handle();
    }

    const key = `auth-cache:${request.user.userId}:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, CACHE_TTL.ONE_MINUTE);
      }),
    );
  }
}
