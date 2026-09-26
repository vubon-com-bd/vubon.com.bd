/**
 * Rate Limit Decorator
 * @module shared-kernel/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export interface RateLimitOptions {
  readonly windowMs: number;
  readonly max: number;
}

export const RATE_LIMIT_META_KEY = 'rate_limit';

export const RateLimit = (options: RateLimitOptions): MethodDecorator & ClassDecorator =>
  SetMetadata(RATE_LIMIT_META_KEY, options);
