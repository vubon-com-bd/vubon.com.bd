/**
 * SSO Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SsoFailedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SSO_FAILED;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string) {
    super(`SSO with ${provider} failed: ${reason}`, { provider, reason });
  }
}

export class SsoNotConfiguredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SSO_NOT_CONFIGURED;
  readonly httpStatus = 501;

  constructor(provider: string) {
    super(`SSO provider not configured: ${provider}`, { provider });
  }
}
