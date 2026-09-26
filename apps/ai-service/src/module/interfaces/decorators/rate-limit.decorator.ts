import { SetMetadata } from '@nestjs/common';

export interface RateLimitOptions {
  readonly max: number;
  readonly windowMs: number;
}

export const RATE_LIMIT_KEY = 'rate_limit';
export const RateLimit = (options: RateLimitOptions): MethodDecorator =>
  SetMetadata(RATE_LIMIT_KEY, options);
