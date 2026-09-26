/**
 * OAuth Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class OAuthFailedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_OAUTH_FAILED;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string) {
    super(`OAuth with ${provider} failed: ${reason}`, { provider, reason });
  }
}

export class OAuthStateMismatchError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_TOKEN_FORMAT;
  readonly httpStatus = 401;

  constructor() {
    super('OAuth state parameter mismatch — possible CSRF');
  }
}
