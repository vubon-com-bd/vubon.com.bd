/**
 * Provider Errors
 * @module notification-service/infrastructure/providers/base
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

export class ProviderNotConfiguredError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(provider: string, channel: string) {
    super(`Provider "${provider}" not configured for channel "${channel}"`, {
      provider,
      channel,
    });
    this.name = 'ProviderNotConfiguredError';
  }
}

export class ProviderNotAvailableError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(provider: string, reason?: string) {
    super(`Provider "${provider}" unavailable${reason ? `: ${reason}` : ''}`, {
      provider,
      reason,
    });
    this.name = 'ProviderNotAvailableError';
  }
}

export class ProviderSendFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string, retryable = false) {
    super(`Provider "${provider}" send failed: ${reason}`, {
      provider,
      reason,
      retryable,
    });
    this.name = 'ProviderSendFailedError';
  }
}

export class ProviderAuthError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor(provider: string) {
    super(`Provider "${provider}" authentication failed`, { provider });
    this.name = 'ProviderAuthError';
  }
}

export class ProviderRateLimitError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 429;

  constructor(provider: string, retryAfterMs?: number) {
    super(
      `Provider "${provider}" rate limit exceeded${retryAfterMs ? ` (retry in ${retryAfterMs}ms)` : ''}`,
      { provider, retryAfterMs },
    );
    this.name = 'ProviderRateLimitError';
  }
}
