/**
 * AuthCacheInterceptor — per-user response cache for auth reads
 * @module auth-service/interfaces/interceptors
 *
 * Only caches GET requests keyed by user + path. TTL controlled by
 * CACHE_TTL constants. Uses RedisService from kernel.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

const DEFAULT_TTL_SECONDS = 60;

interface HttpRequest {
  method: string;
  url: string;
  user?: AuthenticatedUser;
}

@Injectable()
export class AuthCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequest>();

    if (request.method !== 'GET' || !request.user?.id) {
      return next.handle();
    }

    const key = `authcache:${request.user.id}:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null && cached !== undefined) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((data) => {
        void this.redis.set(key, data, DEFAULT_TTL_SECONDS);
      }),
    );
  }
}
