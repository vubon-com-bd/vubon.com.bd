import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SsoLoginFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SSO_FAILED;
  readonly httpStatus = 401;

  constructor(provider: string, reason: string) {
    super(`SSO login failed for ${provider}: ${reason}`, { provider, reason });
  }
}
