import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

const TTL_SECONDS = 60 * 30;

@Injectable()
export class RouteCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();

    if (request.method !== 'GET') return next.handle();

    const key = `logistics:http:route:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) return of(cached);

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, TTL_SECONDS);
      }),
    );
  }
}
