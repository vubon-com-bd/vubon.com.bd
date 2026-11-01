/**
 * Schedule Application Errors
 * @module notification-service/application/errors
 */
import {
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class ScheduleNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(scheduleId: string) {
    super('Schedule', scheduleId);
    this.name = 'ScheduleNotFoundApplicationError';
  }
}

export class ScheduleValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'ScheduleValidationError';
  }
}

export class ScheduleCreationError extends CommandError {
  constructor(reason: string) {
    super(`Schedule creation failed: ${reason}`, 'CreateSchedule');
    this.name = 'ScheduleCreationError';
  }
}

export class ScheduleUpdateError extends CommandError {
  constructor(scheduleId: string, reason: string) {
    super(`Schedule "${scheduleId}" update failed: ${reason}`, 'UpdateSchedule');
    this.name = 'ScheduleUpdateError';
  }
}

export class ScheduleCancelError extends CommandError {
  constructor(scheduleId: string, reason: string) {
    super(`Schedule "${scheduleId}" cancel failed: ${reason}`, 'CancelSchedule');
    this.name = 'ScheduleCancelError';
  }
}

export class ScheduleQueryError extends QueryError {
  constructor(reason: string) {
    super(`Schedule query failed: ${reason}`, 'ScheduleQuery');
    this.name = 'ScheduleQueryError';
  }
}
