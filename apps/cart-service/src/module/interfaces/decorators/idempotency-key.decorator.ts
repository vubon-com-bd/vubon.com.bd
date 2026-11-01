/**
 * @IdempotencyHeader() — extracts Idempotency-Key from headers
 * @module cart-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';

export const IdempotencyHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();

    const raw =
      req.headers[IDEMPOTENCY_KEY_HEADER] ?? req.headers['x-idempotency-key'];

    if (Array.isArray(raw)) return raw[0];
    return raw;
  },
);

/**
 * @GuestTokenHeader() — extracts X-Guest-Token from headers
 */
export const GUEST_TOKEN_PARAM_HEADER = 'x-guest-token';

export const GuestTokenHeader = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();

    const raw =
      req.headers[GUEST_TOKEN_PARAM_HEADER] ?? req.headers['guest-token'];

    if (Array.isArray(raw)) return raw[0];
    return raw;
  },
);
