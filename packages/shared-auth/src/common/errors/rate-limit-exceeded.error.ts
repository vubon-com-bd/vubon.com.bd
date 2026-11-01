import { AuthError } from './auth-error';

/** 429 — too many auth attempts. Respect Retry-After. */
export class RateLimitExceededError extends AuthError {
  public readonly retryAfter: number | undefined;

  constructor(retryAfter?: number, cause?: unknown) {
    super('Too many attempts', {
      code: 'RATE_LIMIT_EXCEEDED',
      statusCode: 429,
      cause,
      meta: retryAfter !== undefined ? { retryAfter } : undefined,
    });
    this.name = 'RateLimitExceededError';
    this.retryAfter = retryAfter;
  }
}
