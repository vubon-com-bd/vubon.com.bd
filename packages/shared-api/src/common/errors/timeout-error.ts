import { ApiError } from './api-error';

/** Request exceeded configured timeout. */
export class TimeoutError extends ApiError {
  public readonly timeoutMs: number;

  constructor(timeoutMs: number, cause?: unknown) {
    super(`Request timed out after ${timeoutMs}ms`, {
      code: 'TIMEOUT_ERROR',
      cause,
    });
    this.name = 'TimeoutError';
    this.timeoutMs = timeoutMs;
  }
}
