import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ActivityLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(limit: number) {
    super(`Activity limit exceeded: max ${limit}`, { limit });
  }
}

export class InvalidActivityTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(type: string) {
    super(`Invalid activity type: ${type}`, { type });
  }
}

export class InvalidActivityIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid activity ID: ${reason}`, { reason });
  }
}

export class InvalidActivityTimestampError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid activity timestamp: ${reason}`, { reason });
  }
}
