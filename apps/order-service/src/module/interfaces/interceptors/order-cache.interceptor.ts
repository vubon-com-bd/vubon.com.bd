import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class OrderCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();

    if (request.method !== 'GET') {
      return next.handle();
    }

    const key = `order-cache:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, 300);
      }),
    );
  }
}
