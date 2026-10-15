/**
 * @Idempotent() — enables idempotency for POST/PATCH routes
 * @module cart-service/interfaces/decorators
 *
 * Usage:
 *   @Idempotent()
 *   @Post()
 *   async create(@IdempotencyHeader() key: string) { ... }
 */
import { SetMetadata } from '@nestjs/common';

export const IDEMPOTENT_META_KEY = 'cart_service_idempotent';

export interface IdempotentOptions {
  readonly ttlSeconds?: number;
  readonly required?: boolean;
}

export const Idempotent = (
  options: IdempotentOptions = {},
): MethodDecorator & ClassDecorator =>
  SetMetadata(IDEMPOTENT_META_KEY, {
    ttlSeconds: options.ttlSeconds ?? 86400,
    required: options.required ?? false,
  });
