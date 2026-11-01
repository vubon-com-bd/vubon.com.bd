/**
 * RateLimitInterceptor — adds X-RateLimit-* headers
 * @module notification-service/interfaces/interceptors
 *
 * Uses simple token bucket; production-grade via Redis is in guard।
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Bucket {
  count: number;
  resetAt: number;
}

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private readonly buckets = new Map<string, Bucket>();
  private readonly windowMs = 60_000;
  private readonly maxRequests = 100;

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      user?: { userId?: string };
      ip?: string;
    }>();
    const res = context.switchToHttp().getResponse<{
      setHeader: (key: string, value: string) => void;
    }>();

    const key = req.user?.userId ?? req.ip ?? 'unknown';
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + this.windowMs };
      this.buckets.set(key, bucket);
    }
    bucket.count += 1;

    const remaining = Math.max(0, this.maxRequests - bucket.count);
    const resetSec = Math.ceil((bucket.resetAt - now) / 1000);

    try {
      res.setHeader('X-RateLimit-Limit', String(this.maxRequests));
      res.setHeader('X-RateLimit-Remaining', String(remaining));
      res.setHeader('X-RateLimit-Reset', String(resetSec));
    } catch {
      // silent — headers may not be settable in some contexts
    }

    return next.handle().pipe(tap(() => void bucket));
  }
}
