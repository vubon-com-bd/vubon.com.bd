/**
 * Order tracking domain errors
 * @module order-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TrackingNotFoundError extends NotFoundError {
  constructor(trackingNumber: string) {
    super('OrderTracking', trackingNumber);
    this.name = 'TrackingNotFoundError';
  }
}

export class InvalidTrackingStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid tracking status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidTrackingStatusError';
  }
}

export class InvalidTrackingEventError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid tracking event "${value}". Allowed: ${allowed.join(', ')}`, 'event');
    this.name = 'InvalidTrackingEventError';
  }
}

export class TrackingNumberExistsError extends ConflictError {
  constructor(trackingNumber: string) {
    super(`Tracking number "${trackingNumber}" already exists`, 'trackingNumber');
    this.name = 'TrackingNumberExistsError';
  }
}
