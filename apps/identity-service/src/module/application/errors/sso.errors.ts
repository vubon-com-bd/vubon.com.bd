import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SsoOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;
  constructor(provider: string, reason: string) {
    super(`SSO ${provider} failed: ${reason}`, { provider, reason });
    this.name = 'SsoOperationFailedError';
  }
}
