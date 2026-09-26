import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CommissionNotCalculatedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Commission not calculated: ${reason}`, { reason });
  }
}

export class InvalidCommissionIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid commission id: ${value}`, { value });
  }
}

export class InvalidCommissionRateError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid commission rate: ${value}`, { value });
  }
}

export class InvalidCommissionTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid commission type: ${value}`, { value });
  }
}
