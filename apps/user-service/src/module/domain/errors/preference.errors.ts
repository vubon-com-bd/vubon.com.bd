import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InvalidPreferenceError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(key: string, reason: string) {
    super(`Invalid preference '${key}': ${reason}`, { key, reason });
  }
}

export class PreferenceNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(key: string) {
    super(`Preference not found: ${key}`, { key });
  }
}

export class InvalidPreferenceIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid preference ID: ${reason}`, { reason });
  }
}

export class InvalidPreferenceKeyError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(key: string) {
    super(`Invalid preference key: ${key}`, { key });
  }
}

export class InvalidPreferenceValueError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid preference value: ${reason}`, { reason });
  }
}
