import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

interface CachedRequest {
  readonly method: string;
  readonly url: string;
}

interface CacheEntry {
  readonly value: unknown;
  readonly expiresAt: number;
}

const TTL_SECONDS = 60 * 5;

@Injectable()
export class CampaignCacheInterceptor implements NestInterceptor {
  private readonly store = new Map<string, CacheEntry>();

  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<CachedRequest>();
    if (request.method !== 'GET') return next.handle();

    const key = `marketing-cache:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) return of(cached);

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, TTL_SECONDS);
      }),
    );
  }
}
