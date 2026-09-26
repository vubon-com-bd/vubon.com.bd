import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

const TTL_SECONDS = 60;

@Injectable()
export class NotificationCacheInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      user?: { userId?: string };
    }>();

    if (request.method !== 'GET' || !request.user?.userId) {
      return next.handle();
    }

    const key = `notif-cache:${request.user.userId}:${request.url}`;
    const cached = await this.redis.get<unknown>(key);
    if (cached !== null) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((value) => {
        void this.redis.set(key, value, TTL_SECONDS);
      }),
    );
  }
}
