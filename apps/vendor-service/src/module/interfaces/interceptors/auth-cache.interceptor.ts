/**
 * AuthCacheInterceptor — caches per-user auth context
 * @module vendor-service/interfaces/interceptors
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

const PREFIX = 'vendor-auth-context:';
const TTL_SECONDS = 300;

@Injectable()
export class AuthCacheInterceptor implements NestInterceptor {
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

    if (req.method !== 'GET' || !req.user?.userId) return next.handle();

    const key = `${PREFIX}${req.user.userId}:${req.url}`;

    try {
      const cached = await this.redis.get<unknown>(key);
      if (cached !== null && cached !== undefined) return of(cached);
    } catch {
      /* miss */
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis.set(key, data, TTL_SECONDS);
      }),
    );
  }
}
