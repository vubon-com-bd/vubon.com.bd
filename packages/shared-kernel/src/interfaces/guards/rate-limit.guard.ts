/**
 * Rate Limit Guard
 * @module shared-kernel/interfaces/guards
 */
import { HttpException, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

interface BucketEntry {
  count: number;
  resetAt: number;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly buckets = new Map<string, BucketEntry>();
  private readonly windowMs = 60_000;
  private readonly maxRequests = 100;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      ip?: string;
      user?: { userId?: string };
    }>();

    const key = request.user?.userId ?? request.ip ?? 'unknown';
    const now = Date.now();
    const entry = this.buckets.get(key);

    if (!entry || now >= entry.resetAt) {
      this.buckets.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    entry.count += 1;
    if (entry.count > this.maxRequests) {
      throw new HttpException(
        {
          statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
          message: 'Too many requests',
        },
        HTTP_STATUS.TOO_MANY_REQUESTS
      );
    }
    return true;
  }
}
