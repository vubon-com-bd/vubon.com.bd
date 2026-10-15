/**
 * CartLockInterceptor — distributed lock for cart mutations
 * @module cart-service/interfaces/interceptors
 *
 * Prevents concurrent mutations to the same cart.
 */
import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { type Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

const LOCK_PREFIX = 'cart-service:lock:';
const LOCK_TTL_SECONDS = 10;

@Injectable()
export class CartLockInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CartLockInterceptor.name);

  constructor(private readonly redis: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      params?: Record<string, string>;
    }>();

    // Only lock mutations
    if (req.method === 'GET') return next.handle();

    const cartId = req.params?.['cartId'] ?? req.params?.['id'];
    if (!cartId) return next.handle();

    const lockKey = `${LOCK_PREFIX}${cartId}`;

    try {
      const acquired = await this.tryAcquire(lockKey);
      if (!acquired) {
        throw new ConflictException({
          statusCode: HTTP_STATUS.CONFLICT,
          code: ERROR_CODE.DUPLICATE_REQUEST,
          message: 'Cart is being modified, please retry',
        });
      }
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      // If Redis unavailable — fail open (allow request)
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Lock acquire failed (fail-open): ${msg.slice(0, 100)}`);
      return next.handle();
    }

    return next.handle().pipe(
      finalize(() => {
        void this.release(lockKey).catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Lock release failed: ${msg.slice(0, 100)}`);
        });
      }),
    );
  }

  private async tryAcquire(key: string): Promise<boolean> {
    const exists = await this.redis.exists(key);
    if (exists) return false;
    await this.redis.set(key, Date.now(), LOCK_TTL_SECONDS);
    return true;
  }

  private async release(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
