/**
 * Tracking domain errors
 * @module logistics-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TRACKING_EVENT, TRACKING_STATUS, TRACKING_SOURCE, TRACKING } from '@vubon/shared-constants/logistics';

const ALLOWED_EVENTS = Object.values(TRACKING_EVENT) as readonly string[];
const ALLOWED_STATUSES = Object.values(TRACKING_STATUS) as readonly string[];
const ALLOWED_SOURCES = Object.values(TRACKING_SOURCE) as readonly string[];

export class TrackingNotFoundError extends NotFoundError {
  constructor(trackingNumber: string) {
    super('Tracking', trackingNumber);
    this.name = 'TrackingNotFoundError';
  }
}

export class InvalidTrackingEventError extends ValidationError {
  constructor(value: string) {
    super(`Invalid tracking event "${value}". Allowed: ${ALLOWED_EVENTS.join(', ')}`, 'event');
    this.name = 'InvalidTrackingEventError';
  }
}

export class InvalidTrackingStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid tracking status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidTrackingStatusError';
  }
}

export class InvalidTrackingSourceError extends ValidationError {
  constructor(value: string) {
    super(`Invalid tracking source "${value}". Allowed: ${ALLOWED_SOURCES.join(', ')}`, 'source');
    this.name = 'InvalidTrackingSourceError';
  }
}

export class TrackingEventLimitExceededError extends BusinessRuleError {
  constructor(trackingNumber: string, count: number) {
    super(
      `Tracking "${trackingNumber}" has exceeded max events (${count}/${TRACKING.MAX_EVENTS})`,
      'TRACKING_EVENT_LIMIT_EXCEEDED',
      { trackingNumber, count, max: TRACKING.MAX_EVENTS },
    );
    this.name = 'TrackingEventLimitExceededError';
  }
}

export class TrackingUpdateFailedError extends BusinessRuleError {
  constructor(trackingNumber: string, reason: string) {
    super(
      `Failed to update tracking "${trackingNumber}": ${reason}`,
      'TRACKING_UPDATE_FAILED',
      { trackingNumber, reason },
    );
    this.name = 'TrackingUpdateFailedError';
  }
}

export class TrackingFinalizedError extends BusinessRuleError {
  constructor(trackingNumber: string) {
    super(
      `Tracking "${trackingNumber}" is finalized and cannot accept new events`,
      'TRACKING_FINALIZED',
      { trackingNumber },
    );
    this.name = 'TrackingFinalizedError';
  }
}
