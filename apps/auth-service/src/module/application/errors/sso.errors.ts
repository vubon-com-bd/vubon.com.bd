/**
 * SSO Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class SsoFailedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SSO_FAILED;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string) {
    super(`SSO with ${provider} failed: ${reason}`, { provider, reason });
  }
}

export class SsoNotConfiguredAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SSO_NOT_CONFIGURED;
  readonly httpStatus = 501;

  constructor(provider: string) {
    super(`SSO provider not configured: ${provider}`, { provider });
  }
}
