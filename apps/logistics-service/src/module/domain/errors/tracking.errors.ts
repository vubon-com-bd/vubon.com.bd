/**
 * Tracking Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TrackingNotFoundError extends NotFoundError {
  constructor(trackingId: string) {
    super('Tracking', trackingId);
    this.name = 'TrackingNotFoundError';
  }
}

export class TrackingAlreadyExistsError extends ConflictError {
  constructor(trackingNumber: string) {
    super(`Tracking "${trackingNumber}" already exists`, 'trackingNumber');
    this.name = 'TrackingAlreadyExistsError';
  }
}

export class InvalidTrackingStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid tracking status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidTrackingStatusError';
  }
}

export class InvalidTrackingSourceError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid tracking source "${value}". Allowed: ${allowed.join(', ')}`, 'source');
    this.name = 'InvalidTrackingSourceError';
  }
}

export class TrackingExpiredError extends BusinessRuleError {
  constructor(trackingId: string, expiresAt: string) {
    super(
      `Tracking "${trackingId}" expired at ${expiresAt}`,
      'TRACKING_EXPIRED',
      { trackingId, expiresAt },
    );
    this.name = 'TrackingExpiredError';
  }
}

export class TrackingCannotBeUpdatedError extends BusinessRuleError {
  constructor(trackingId: string, status: string) {
    super(
      `Tracking "${trackingId}" cannot be updated in status "${status}"`,
      'TRACKING_CANNOT_BE_UPDATED',
      { trackingId, status },
    );
    this.name = 'TrackingCannotBeUpdatedError';
  }
}

export class MaxTrackingEventsExceededError extends BusinessRuleError {
  constructor(trackingId: string, current: number, max: number) {
    super(
      `Tracking "${trackingId}" exceeded max events (${current}/${max})`,
      'MAX_TRACKING_EVENTS_EXCEEDED',
      { trackingId, current, max },
    );
    this.name = 'MaxTrackingEventsExceededError';
  }
}
