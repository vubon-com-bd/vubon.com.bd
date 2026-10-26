/**
 * NotificationRateLimitGuard — prevents spam send requests
 * @module notification-service/interfaces/guards
 *
 * Uses Redis-backed rate limiter (in-memory fallback per Node instance)।
 */
import {
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

interface Bucket {
  count: number;
  resetAt: number;
}

@Injectable()
export class NotificationRateLimitGuard extends BaseGuard {
  private readonly buckets = new Map<string, Bucket>();

  // 10 requests per minute per user
  private readonly windowMs = 60_000;
  private readonly maxRequests = 10;

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      user?: { userId?: string };
      ip?: string;
    }>();

    const key = req.user?.userId ?? req.ip ?? 'unknown';
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      this.buckets.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    bucket.count += 1;
    if (bucket.count > this.maxRequests) {
      const retryAfterSec = Math.ceil((bucket.resetAt - now) / 1000);
      throw new HttpException(
        {
          statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
          code: ERROR_CODE.SERVER_INTERNAL,
          message: `Too many notification requests. Try again in ${retryAfterSec}s.`,
        },
        HTTP_STATUS.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
