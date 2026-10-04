/**
 * @IdempotencyHeader() — extracts Idempotency-Key from headers
 * @module payment-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export const IdempotencyHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();
    const raw = req.headers['idempotency-key'] ?? req.headers['x-idempotency-key'];
    if (Array.isArray(raw)) return raw[0];
    return raw;
  },
);
