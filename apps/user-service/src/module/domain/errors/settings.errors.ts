import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InvalidSettingError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(key: string, reason: string) {
    super(`Invalid setting '${key}': ${reason}`, { key, reason });
  }
}

export class SettingNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(key: string) {
    super(`Setting not found: ${key}`, { key });
  }
}

export class InvalidSettingIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid setting ID: ${reason}`, { reason });
  }
}

export class InvalidSettingKeyError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(key: string) {
    super(`Invalid setting key: ${key}`, { key });
  }
}

export class InvalidSettingValueError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid setting value: ${reason}`, { reason });
  }
}
