import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RATE_LIMIT_KEY, RateLimitOptions } from '../decorators/rate-limit.decorator';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private static requests: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.get<RateLimitOptions>(RATE_LIMIT_KEY, context.getHandler());

    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection?.remoteAddress || 'unknown';
    const key = `${ip}-${request.route?.path || ''}`;
    const now = Date.now();

    const record = RateLimitGuard.requests.get(key);

    if (!record || now > record.resetTime) {
      RateLimitGuard.requests.set(key, {
        count: 1,
        resetTime: now + options.duration * 1000,
      });
      return true;
    }

    if (record.count >= options.points) {
      throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    record.count++;
    RateLimitGuard.requests.set(key, record);
    return true;
  }

  static clear(): void {
    RateLimitGuard.requests.clear();
  }
}
