/**
 * OAuth Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class OAuthFailedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_OAUTH_FAILED;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string) {
    super(`OAuth with ${provider} failed: ${reason}`, { provider, reason });
  }
}

export class OAuthStateMismatchAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_OAUTH_FAILED;
  readonly httpStatus = 400;

  constructor() {
    super('OAuth state parameter mismatch — possible CSRF');
  }
}
