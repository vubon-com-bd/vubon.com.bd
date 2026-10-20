/**
 * Order Tracking Domain Errors
 * @module order-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class TrackingNotFoundError extends NotFoundError {
  constructor(trackingId: string) {
    super('OrderTracking', trackingId);
    this.name = 'TrackingNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class TrackingNumberExistsError extends ConflictError {
  constructor(trackingNumber: string) {
    super(`Tracking number "${trackingNumber}" already exists`, 'trackingNumber');
    this.name = 'TrackingNumberExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidTrackingEventError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid tracking event "${value}". Allowed: ${allowed.join(', ')}`, 'event');
    this.name = 'InvalidTrackingEventError';
  }
}

export class InvalidTrackingStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid tracking status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidTrackingStatusError';
  }
}

export class InvalidTrackingNumberError extends ValidationError {
  constructor(value: string) {
    super(`Invalid tracking number format: "${value}"`, 'trackingNumber');
    this.name = 'InvalidTrackingNumberError';
  }
}
