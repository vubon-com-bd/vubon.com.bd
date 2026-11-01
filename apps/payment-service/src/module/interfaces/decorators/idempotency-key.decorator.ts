/**
 * @IdempotencyHeader() — extracts Idempotency-Key from request headers
 * @module payment-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

/**
 * Pure helper — extracts idempotency key from headers map.
 * Exported so it can be unit-tested directly.
 */
export function extractIdempotencyKey(
  headers: Record<string, string | string[] | undefined>,
): string | undefined {
  const raw = headers['idempotency-key'] ?? headers['x-idempotency-key'];
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

export const IdempotencyHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();
    return extractIdempotencyKey(req.headers);
  },
);
