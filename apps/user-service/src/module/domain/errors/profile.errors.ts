import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ProfileNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId: string) {
    super(`Profile not found for user: ${userId}`, { userId });
  }
}

export class ProfileIncompleteError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Profile incomplete: ${reason}`, { reason });
  }
}

export class InvalidVisibilityError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(visibility: string) {
    super(`Invalid visibility: ${visibility}`, { visibility });
  }
}

export class InvalidProfileVisibilityError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(visibility: string) {
    super(`Invalid profile visibility: ${visibility}`, { visibility });
  }
}
