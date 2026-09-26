import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { RATE_LIMIT_KEY, type RateLimitOptions } from '../decorators/rate-limit.decorator';

@Injectable()
export class RateLimitGuard extends BaseGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redis: RedisService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const opts = this.reflector.getAllAndOverride<RateLimitOptions>(
      RATE_LIMIT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!opts) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string }; ip?: string }>();
    const key = `ai:ratelimit:${request.user?.userId ?? request.ip ?? 'anon'}`;

    const current = (await this.redis.get<number>(key)) ?? 0;
    if (current >= opts.max) {
      throw new HttpException(
        `Rate limit exceeded (${opts.max}/${opts.windowMs}ms)`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    await this.redis.set(key, current + 1, Math.ceil(opts.windowMs / 1000));
    return true;
  }
}
