/**
 * Event Application Errors
 * @module analytics-service/application/errors
 */
import { ApplicationError, ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class EventTrackingError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 422;

  constructor(public readonly eventName: string, reason: string) {
    super(`Failed to track event "${eventName}": ${reason}`, { eventName, reason });
    this.name = 'EventTrackingError';
  }
}

export class EventBatchTooLargeError extends ApplicationValidationError {
  constructor(public readonly size: number, public readonly maxSize: number) {
    super(`Batch size ${size} exceeds max ${maxSize}`, 'events');
    this.name = 'EventBatchTooLargeError';
  }
}
