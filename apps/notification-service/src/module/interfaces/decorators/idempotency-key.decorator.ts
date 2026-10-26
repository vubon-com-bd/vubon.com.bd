/**
 * @IdempotencyHeader() — extracts Idempotency-Key from request headers
 * @module notification-service/interfaces/decorators
 *
 * Usage:
 *   create(@IdempotencyHeader() idempotencyKey?: string) { ... }
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

// Local — middleware exports the canonical name
const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';

export const IdempotencyHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();

    const raw =
      req.headers[IDEMPOTENCY_KEY_HEADER] ??
      req.headers['x-idempotency-key'] ??
      req.headers['Idempotency-Key'];

    if (Array.isArray(raw)) return raw[0];
    return raw;
  },
);
