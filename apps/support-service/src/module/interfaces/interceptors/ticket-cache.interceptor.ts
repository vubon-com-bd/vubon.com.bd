import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

const CACHE_TTL_SECONDS = 60;

@Injectable()
export class TicketCacheInterceptor implements NestInterceptor {
  private readonly store = new Map<string, CacheEntry>();

  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string; params?: { ticketId?: string } }>();

    if (request.method !== 'GET' || !request.params?.ticketId) {
      return next.handle();
    }

    const key = `support:cache:ticket:${request.params.ticketId}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, CACHE_TTL_SECONDS);
      }),
    );
  }
}
