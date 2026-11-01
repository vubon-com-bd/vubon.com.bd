/**
 * IdempotencyInterceptor — replay cached response for repeated keys
 * @module payment-service/interfaces/interceptors
 *
 * Reads `Idempotency-Key` header; if response for key already cached,
 * returns cached body. Otherwise caches successful response.
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, type Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'payment-idem-http:';
const TTL_SECONDS = 24 * 60 * 60; // 24 hours

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      headers: Record<string, string | string[] | undefined>;
    }>();

    if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'PATCH') {
      return next.handle();
    }

    const raw =
      req.headers['idempotency-key'] ?? req.headers['x-idempotency-key'];
    const key = Array.isArray(raw) ? raw[0] : raw;
    if (!key) return next.handle();

    const cacheKey = `${PREFIX}${key}`;

    try {
      const cached = await this.redis.get<unknown>(cacheKey);
      if (cached !== null && cached !== undefined) return of(cached);
    } catch {
      /* proceed */
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis
          .set(cacheKey, data, TTL_SECONDS)
          .catch(() => undefined);
      }),
    );
  }
}
