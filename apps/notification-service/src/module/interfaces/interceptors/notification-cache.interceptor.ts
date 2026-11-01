/**
 * NotificationCacheInterceptor — Redis GET cache
 * @module notification-service/interfaces/interceptors
 *
 * Caches GET responses for 30s per user/url combination।
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

const PREFIX = 'notification:http:cache:';
const DEFAULT_TTL = 30; // 30 seconds

@Injectable()
export class NotificationCacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(NotificationCacheInterceptor.name);

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

    const userId = req.user?.userId ?? 'anon';
    const key = `${PREFIX}${userId}:${req.url}`;

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) {
        this.logger.debug(`Cache HIT: ${key}`);
        return of(cached);
      }
    } catch {
      // cache miss — continue
    }

    return next.handle().pipe(
      tap((data) => {
        try {
          void this.redis.set(key, data, DEFAULT_TTL).catch(() => {
            // silent — cache write failure is non-fatal
          });
        } catch {
          // silent — sync errors from set()
        }
      }),
    );
  }

  static readonly _ttl = CACHE_TTL.ONE_MINUTE;
}
