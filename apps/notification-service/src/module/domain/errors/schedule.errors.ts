/**
 * Notification schedule / broadcast / digest domain errors
 * @module notification-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

// ═══ Schedule ═══
export class ScheduleNotFoundError extends NotFoundError {
  constructor(scheduleId: string) {
    super('NotificationSchedule', scheduleId);
    this.name = 'ScheduleNotFoundError';
  }
}

export class ScheduleInPastError extends ValidationError {
  constructor(scheduledAt: string) {
    super(`Scheduled time ${scheduledAt} is in the past`, 'scheduledAt');
    this.name = 'ScheduleInPastError';
  }
}

export class ScheduleTooFarInFutureError extends ValidationError {
  constructor(scheduledAt: string, maxDays: number) {
    super(`Scheduled time ${scheduledAt} exceeds max window of ${maxDays} days`, 'scheduledAt');
    this.name = 'ScheduleTooFarInFutureError';
  }
}

export class InvalidScheduleTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid schedule type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidScheduleTypeError';
  }
}

export class InvalidScheduleStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid schedule status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidScheduleStatusError';
  }
}

export class InvalidScheduleRecurrenceError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid schedule recurrence "${value}". Allowed: ${allowed.join(', ')}`, 'recurrence');
    this.name = 'InvalidScheduleRecurrenceError';
  }
}

export class ScheduleAlreadyTriggeredError extends ConflictError {
  constructor(scheduleId: string) {
    super(`Schedule "${scheduleId}" has already been triggered`, 'scheduleId');
    this.name = 'ScheduleAlreadyTriggeredError';
  }
}

export class ScheduleCannotBePausedError extends BusinessRuleError {
  constructor(scheduleId: string, status: string) {
    super(
      `Schedule "${scheduleId}" cannot be paused in status "${status}"`,
      'SCHEDULE_CANNOT_BE_PAUSED',
      { scheduleId, status },
    );
    this.name = 'ScheduleCannotBePausedError';
  }
}

// ═══ Broadcast ═══
export class BroadcastNotFoundError extends NotFoundError {
  constructor(broadcastId: string) {
    super('NotificationBroadcast', broadcastId);
    this.name = 'BroadcastNotFoundError';
  }
}

export class InvalidBroadcastTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid broadcast type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidBroadcastTypeError';
  }
}

export class InvalidBroadcastStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid broadcast status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidBroadcastStatusError';
  }
}

export class InvalidBroadcastTargetError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid broadcast target "${value}". Allowed: ${allowed.join(', ')}`, 'target');
    this.name = 'InvalidBroadcastTargetError';
  }
}

export class BroadcastRecipientLimitExceededError extends BusinessRuleError {
  constructor(count: number, max: number) {
    super(
      `Broadcast recipient count ${count} exceeds maximum ${max}`,
      'BROADCAST_RECIPIENT_LIMIT_EXCEEDED',
      { count, max },
    );
    this.name = 'BroadcastRecipientLimitExceededError';
  }
}

// ═══ Digest ═══
export class DigestNotFoundError extends NotFoundError {
  constructor(digestId: string) {
    super('NotificationDigest', digestId);
    this.name = 'DigestNotFoundError';
  }
}

export class InvalidDigestFrequencyError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid digest frequency "${value}". Allowed: ${allowed.join(', ')}`, 'frequency');
    this.name = 'InvalidDigestFrequencyError';
  }
}

export class InvalidDigestTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid digest type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDigestTypeError';
  }
}

export class InvalidDigestStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid digest status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDigestStatusError';
  }
}
