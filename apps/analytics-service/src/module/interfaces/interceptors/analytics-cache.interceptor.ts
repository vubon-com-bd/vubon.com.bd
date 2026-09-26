import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { getOptionalEnvInt } from '@vubon/shared-config/common';

@Injectable()
export class AnalyticsCacheInterceptor implements NestInterceptor {
  private readonly ttlSeconds: number;

  constructor(private readonly redis: RedisService) {
    this.ttlSeconds = getOptionalEnvInt('CACHE_DEFAULT_TTL', 300);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string; user?: { userId?: string } }>();

    if (request.method !== 'GET') {
      return next.handle();
    }

    const key = `analytics-cache:${request.user?.userId ?? 'anon'}:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, this.ttlSeconds);
      }),
    );
  }
}
