import { SetMetadata } from '@nestjs/common';

export const IDEMPOTENT_KEY = 'idempotent';

export interface IdempotentOptions {
  readonly ttlSeconds?: number;
  readonly headerName?: string;
}

export const Idempotent = (
  options: IdempotentOptions = {},
): MethodDecorator & ClassDecorator =>
  SetMetadata(IDEMPOTENT_KEY, {
    ttlSeconds: options.ttlSeconds ?? 86400,
    headerName: options.headerName ?? 'x-idempotency-key',
  });
