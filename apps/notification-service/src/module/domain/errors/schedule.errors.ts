/* istanbul ignore file -- pure error declarations */
/**
 * Schedule Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class ScheduleNotFoundError extends NotFoundError {
  constructor(scheduleId: string) {
    super('Schedule', scheduleId);
    this.name = 'ScheduleNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidScheduleStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid schedule status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidScheduleStatusError';
  }
}

export class InvalidScheduleTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid schedule type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidScheduleTypeError';
  }
}

export class InvalidScheduleFrequencyError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid schedule frequency "${value}". Allowed: ${allowed.join(', ')}`, 'frequency');
    this.name = 'InvalidScheduleFrequencyError';
  }
}

export class InvalidScheduleTimeError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid schedule time: ${reason}`, 'time');
    this.name = 'InvalidScheduleTimeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class ScheduleInPastError extends BusinessRuleError {
  constructor(scheduledAt: string) {
    super(
      `Schedule time "${scheduledAt}" is in the past`,
      'SCHEDULE_IN_PAST',
      { scheduledAt },
    );
    this.name = 'ScheduleInPastError';
  }
}

export class ScheduleTooFarError extends BusinessRuleError {
  constructor(scheduledAt: string, maxDays: number) {
    super(
      `Schedule time "${scheduledAt}" exceeds maximum of ${maxDays} days in future`,
      'SCHEDULE_TOO_FAR',
      { scheduledAt, maxDays },
    );
    this.name = 'ScheduleTooFarError';
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

export class ScheduleCannotBeResumedError extends BusinessRuleError {
  constructor(scheduleId: string, status: string) {
    super(
      `Schedule "${scheduleId}" cannot be resumed in status "${status}"`,
      'SCHEDULE_CANNOT_BE_RESUMED',
      { scheduleId, status },
    );
    this.name = 'ScheduleCannotBeResumedError';
  }
}
