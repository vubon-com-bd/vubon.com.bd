import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TrackingNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(trackingId: string) {
    super(`Tracking not found: ${trackingId}`, { trackingId });
  }
}

export class InvalidTrackingStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(status: string) {
    super(`Invalid tracking status: ${status}`, { status });
  }
}

export class TrackingNumberExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(trackingNumber: string) {
    super(`Tracking number already exists: ${trackingNumber}`, { trackingNumber });
  }
}
