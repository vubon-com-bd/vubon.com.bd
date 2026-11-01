/**
 * @IdempotencyHeader() — extracts Idempotency-Key from headers
 * @module identity-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

interface HeaderRequest {
  headers: Record<string, string | string[] | undefined>;
}

export const IdempotencyHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<HeaderRequest>();
    const raw =
      req.headers['idempotency-key'] ?? req.headers['x-idempotency-key'];
    if (Array.isArray(raw)) return raw[0];
    return raw;
  },
);
