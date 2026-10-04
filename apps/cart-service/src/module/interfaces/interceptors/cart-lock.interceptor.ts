/**
 * CartLockInterceptor — distributed lock via Redis for mutations
 * @module cart-service/interfaces/interceptors
 */
import {
  CallHandler, ConflictException, ExecutionContext, Inject, Injectable, NestInterceptor,
} from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

const LOCK_TTL_SECONDS = 10;

@Injectable()
export class CartLockInterceptor implements NestInterceptor {
  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      params?: Record<string, string>;
    }>();
    const method = req.method;
    const cartId = req.params?.cartId ?? req.params?.id;

    if (!cartId || (method !== 'POST' && method !== 'PATCH' && method !== 'DELETE')) {
      return next.handle();
    }

    const lockKey = `cart:lock:${cartId}`;

    return from(this.acquireLock(lockKey)).pipe(
      mergeMap((acquired) => {
        if (!acquired) {
          return throwError(() => new ConflictException({
            statusCode: HTTP_STATUS.CONFLICT,
            message: 'Cart is being modified by another request',
          }));
        }
        return next.handle().pipe(tap(() => void this.releaseLock(lockKey)));
      }),
      catchError((err) => {
        void this.releaseLock(lockKey);
        return throwError(() => err);
      }),
    );
  }

  private async acquireLock(key: string): Promise<boolean> {
    try {
      const existing = await this.redis.get<string>(key);
      if (existing) return false;
      await this.redis.set(key, '1', LOCK_TTL_SECONDS);
      return true;
    } catch {
      return true;
    }
  }

  private async releaseLock(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch {
      /* ignore */
    }
  }
}
