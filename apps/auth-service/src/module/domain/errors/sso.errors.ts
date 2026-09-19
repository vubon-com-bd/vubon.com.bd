import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SsoFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SSO_FAILED;
  readonly httpStatus = 401;

  constructor(provider: string, reason: string) {
    super(`SSO failed for ${provider}: ${reason}`, { provider, reason });
  }
}
