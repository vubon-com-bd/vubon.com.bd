import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TrackingNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.TRACKING_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(trackingNumber: string) {
    super(`Tracking not found: ${trackingNumber}`, { trackingNumber });
  }
}

export class InvalidTrackingNumberError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.INVALID_TRACKING_NUMBER;
  readonly httpStatus = 400;

  constructor(trackingNumber: string) {
    super(`Invalid tracking number: ${trackingNumber}`, { trackingNumber });
  }
}
