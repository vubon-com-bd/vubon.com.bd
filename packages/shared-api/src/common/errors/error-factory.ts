import { ApiError } from './api-error';
import { AuthError } from './auth-error';
import { ConflictError } from './conflict-error';
import { NetworkError } from './network-error';
import { NotFoundError } from './not-found-error';
import { RateLimitError } from './rate-limit-error';
import { ServerError } from './server-error';
import { TimeoutError } from './timeout-error';
import { ValidationError } from './validation-error';

/**
 * Map an arbitrary error + HTTP context into a typed ApiError subclass.
 * This is the SINGLE place where error kind decisions are made.
 */
export const ErrorFactory = {
  fromHttp(options: {
    status: number;
    method: string;
    url: string;
    responseBody?: unknown;
    retryAfter?: number;
  }): ApiError {
    const { status, method, url, responseBody, retryAfter } = options;

    if (status === 401 || status === 403) {
      return new AuthError(status === 401 ? 'Unauthorized' : 'Forbidden', {
        status,
        method,
        url,
        responseBody,
      });
    }
    if (status === 404) return new NotFoundError({ method, url, responseBody });
    if (status === 409) return new ConflictError({ method, url, responseBody });
    if (status === 422) {
      return new ValidationError('Validation failed', [], responseBody);
    }
    if (status === 429) {
      return new RateLimitError({ method, url, retryAfter, responseBody });
    }
    if (status >= 500) return new ServerError({ method, url, status, responseBody });

    return new ApiError(`HTTP ${status}`, { status, code: `HTTP_${status}` });
  },

  fromNetwork(cause: unknown): ApiError {
    return new NetworkError('Network request failed', cause);
  },

  fromTimeout(timeoutMs: number, cause?: unknown): ApiError {
    return new TimeoutError(timeoutMs, cause);
  },

  fromUnknown(cause: unknown): ApiError {
    if (cause instanceof ApiError) return cause;
    if (cause instanceof Error) {
      return new ApiError(cause.message, { cause, code: 'UNKNOWN_ERROR' });
    }
    return new ApiError('Unknown error', { cause, code: 'UNKNOWN_ERROR' });
  },
} as const;
