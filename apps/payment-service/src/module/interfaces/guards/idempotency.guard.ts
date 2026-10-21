/**
 * IdempotencyGuard — require Idempotency-Key header for mutation
 * @module payment-service/interfaces/guards
 *
 * Financial operations must be idempotent. Reject POSTs without key.
 */
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';
const MIN_KEY_LENGTH = 8;
const MAX_KEY_LENGTH = 128;

@Injectable()
export class IdempotencyGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();

    const raw =
      req.headers[IDEMPOTENCY_KEY_HEADER] ??
      req.headers['x-idempotency-key'];

    const key = Array.isArray(raw) ? raw[0] : raw;

    if (!key) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Missing Idempotency-Key header',
      });
    }

    if (key.length < MIN_KEY_LENGTH || key.length > MAX_KEY_LENGTH) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: `Idempotency-Key must be ${MIN_KEY_LENGTH}-${MAX_KEY_LENGTH} characters`,
      });
    }

    return true;
  }
}
