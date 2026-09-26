import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, from, switchMap } from 'rxjs';
import { RateLimiterService } from '../../infrastructure/services/internal/rate-limiter.service';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  constructor(private readonly rateLimiter: RateLimiterService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      ip?: string;
      url: string;
      user?: { userId?: string };
    }>();

    const key = request.user?.userId ?? request.ip ?? 'anonymous';

    return from(this.rateLimiter.check(key)).pipe(
      switchMap((result) => {
        if (!result.allowed) {
          throw new HttpException(
            'Rate limit exceeded',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        return next.handle();
      }),
    );
  }
}
