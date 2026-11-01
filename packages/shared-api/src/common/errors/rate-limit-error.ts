import { HttpError } from './http-error';

/** 429 — too many requests. Respect Retry-After. */
export class RateLimitError extends HttpError {
  /** Seconds to wait before retry (from Retry-After header). */
  public readonly retryAfter: number | undefined;

  constructor(options: {
    method: string;
    url: string;
    retryAfter?: number;
    responseBody?: unknown;
    cause?: unknown;
  }) {
    super('Rate limit exceeded', {
      code: 'RATE_LIMIT',
      status: 429,
      method: options.method,
      url: options.url,
      responseBody: options.responseBody,
      cause: options.cause,
    });
    this.name = 'RateLimitError';
    this.retryAfter = options.retryAfter;
  }
}
