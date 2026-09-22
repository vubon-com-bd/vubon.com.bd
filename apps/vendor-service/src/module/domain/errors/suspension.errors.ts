import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SuspensionNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(suspensionId: string) {
    super(`Suspension not found: ${suspensionId}`, { suspensionId });
  }
}

export class AlreadySuspendedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string) {
    super(`Vendor already suspended: ${vendorId}`, { vendorId });
  }
}

export class InvalidSuspensionIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid suspension id: ${value}`, { value });
  }
}

export class InvalidSuspensionReasonError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid suspension reason: ${value}`, { value });
  }
}

export class InvalidSuspensionStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid suspension status: ${value}`, { value });
  }
}
