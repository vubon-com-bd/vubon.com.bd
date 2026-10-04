/**
 * Verification Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class VerificationNotFoundError extends DomainError {
  readonly code = ERROR_CODE.AUTH_VERIFICATION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`Verification not found for user: ${userId}`, { userId });
  }
}

export class VerificationExpiredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_VERIFICATION_EXPIRED;
  readonly httpStatus = 410;

  constructor(expiredAt: string) {
    super(`Verification expired at ${expiredAt}`, { expiredAt });
  }
}

export class VerificationCodeMismatchError extends DomainError {
  readonly code = ERROR_CODE.AUTH_VERIFICATION_CODE_MISMATCH;
  readonly httpStatus = 422;

  constructor() {
    super('Verification code does not match');
  }
}
