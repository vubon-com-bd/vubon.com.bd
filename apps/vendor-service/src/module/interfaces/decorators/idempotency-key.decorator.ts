/**
 * IdempotencyKey decorator — extracts X-Idempotency-Key header
 * @module vendor-service/interfaces/decorators
 */
import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';

export const IdempotencyKey = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
    }>();
    const raw = request.headers['x-idempotency-key'];
    return Array.isArray(raw) ? raw[0] : raw;
  },
);
