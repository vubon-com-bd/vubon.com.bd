import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class MfaRequiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_REQUIRED;
  readonly httpStatus = 401;

  constructor(userId: string) {
    super(`MFA required for user: ${userId}`, { userId });
  }
}

export class MfaInvalidError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_INVALID;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`MFA invalid: ${reason}`, { reason });
  }
}
