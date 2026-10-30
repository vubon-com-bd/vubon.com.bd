/**
 * RateLimitInterceptor — global per-IP + per-user rate limiting
 * @module identity-service/interfaces/interceptors
 *
 * Uses RateLimiterService (Redis sliding-window).
 * Skips health endpoints and public metadata.
 */

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { RateLimiterService } from '../../infrastructure/services/internal/rate-limiter.service.js';
import { AUTH_RATE_LIMIT_CONFIG } from '../../infrastructure/config/rate-limit.config.js';

const SKIP_PATHS = ['/health', '/api/v1/health', '/api/docs', '/api/v1/docs', '/favicon.ico'];

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RateLimitInterceptor.name);

  constructor(private readonly limiter: RateLimiterService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      ip?: string;
      user?: { userId?: string };
    }>();

    // Skip health/docs
    const url = req.url ?? '';
    if (SKIP_PATHS.some((p) => url.startsWith(p))) {
      return next.handle();
    }

    // Determine limit tier
    const isAuthPath = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
    const isOtpPath = url.includes('/otp') || url.includes('/verify');
    const max = isAuthPath
      ? AUTH_RATE_LIMIT_CONFIG.authMax
      : isOtpPath
        ? AUTH_RATE_LIMIT_CONFIG.otpMax
        : AUTH_RATE_LIMIT_CONFIG.apiMax;

    const windowSec = AUTH_RATE_LIMIT_CONFIG.windowSeconds;
    const identity = req.user?.userId ? `user:${req.user.userId}` : `ip:${req.ip ?? 'unknown'}`;
    const key = `${req.method}:${identity}:${isAuthPath ? 'auth' : isOtpPath ? 'otp' : 'api'}`;

    return from(
      this.limiter.check(key, max, windowSec).then((result) => {
        if (!result.allowed) {
          this.logger.warn(`Rate limit exceeded: ${key}`);
          throw new HttpException(
            {
              statusCode: HttpStatus.TOO_MANY_REQUESTS,
              message: `Too many requests. Retry after ${result.retryAfterSeconds}s`,
              retryAfter: result.retryAfterSeconds,
            },
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        // Delegate to next handler
        return new Promise((resolve, reject) => {
          next.handle().subscribe({
            next: resolve,
            error: reject,
            complete: () => {},
          });
        });
      }),
    );
  }
}
