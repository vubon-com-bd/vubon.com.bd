/**
 * @IdempotencyHeader() — extracts Idempotency-Key from headers
 * @module product-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';
export const X_IDEMPOTENCY_KEY_HEADER = 'x-idempotency-key';

export const IdempotencyHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();
    const raw =
      req.headers[IDEMPOTENCY_KEY_HEADER] ?? req.headers[X_IDEMPOTENCY_KEY_HEADER];
    if (Array.isArray(raw)) return raw[0];
    return raw;
  },
);
