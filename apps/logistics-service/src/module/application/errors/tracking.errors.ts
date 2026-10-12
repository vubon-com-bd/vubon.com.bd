/**
 * Tracking application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class TrackingNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.TRACKING_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly trackingNumber: string) {
    super(`Tracking "${trackingNumber}" not found`, { trackingNumber });
    this.name = 'TrackingNotFoundApplicationError';
  }
}

export class TrackingOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly trackingId?: string) {
    super(`Tracking ${operation} failed: ${reason}`, { operation, trackingId });
    this.name = 'TrackingOperationFailedApplicationError';
  }
}
