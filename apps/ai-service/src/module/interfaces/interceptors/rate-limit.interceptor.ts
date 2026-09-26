import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '@vubon/shared-kernel/infrastructure';

const DEFAULT_MAX = 60;
const DEFAULT_WINDOW_SECONDS = 60;

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string }; ip?: string }>();
    const key = `ai:rl:int:${request.user?.userId ?? request.ip ?? 'anon'}`;

    const current = (await this.redis.get<number>(key)) ?? 0;
    if (current >= DEFAULT_MAX) {
      throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.redis.set(key, current + 1, DEFAULT_WINDOW_SECONDS);
    return next.handle();
  }
}
