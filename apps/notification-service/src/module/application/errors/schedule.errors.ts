/**
 * Schedule / Broadcast / Digest Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

// ═══ Schedule ═══
export class ScheduleNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(scheduleId: string) {
    super('NotificationSchedule', scheduleId);
    this.name = 'ScheduleNotFoundApplicationError';
  }
}

export class ScheduleInPastError extends ApplicationValidationError {
  constructor(scheduledAt: string) {
    super(`Scheduled time "${scheduledAt}" is in the past`, 'scheduledAt');
    this.name = 'ScheduleInPastError';
  }
}

export class ScheduleValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'ScheduleValidationError';
  }
}

// ═══ Broadcast ═══
export class BroadcastNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(broadcastId: string) {
    super('NotificationBroadcast', broadcastId);
    this.name = 'BroadcastNotFoundApplicationError';
  }
}

export class BroadcastAlreadyRunningError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(broadcastId: string) {
    super(`Broadcast "${broadcastId}" is already running`, { broadcastId });
    this.name = 'BroadcastAlreadyRunningError';
  }
}

export class BroadcastRecipientLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;
  constructor(count: number, max: number) {
    super(`Broadcast recipient count ${count} exceeds maximum ${max}`, { count, max });
    this.name = 'BroadcastRecipientLimitExceededError';
  }
}

// ═══ Digest ═══
export class DigestNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(digestId: string) {
    super('NotificationDigest', digestId);
    this.name = 'DigestNotFoundApplicationError';
  }
}

export class DigestValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'DigestValidationError';
  }
}
