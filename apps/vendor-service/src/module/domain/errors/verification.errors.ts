import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class VerificationNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(verificationId: string) {
    super(`Verification not found: ${verificationId}`, { verificationId });
  }
}

export class VerificationExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 410;

  constructor(verificationId: string) {
    super(`Verification expired: ${verificationId}`, { verificationId });
  }
}

export class InvalidVerificationIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid verification id: ${value}`, { value });
  }
}

export class InvalidVerificationStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid verification status: ${value}`, { value });
  }
}

export class VerificationNotAllowedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(reason: string) {
    super(`Verification not allowed: ${reason}`, { reason });
  }
}
