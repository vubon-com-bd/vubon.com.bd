/**
 * ScheduleValidator — Zod schema-based validation
 * @module notification-service/application/validators
 */
import { ZodError, z } from 'zod';
import {
  NotificationScheduleSchema,
  NotificationScheduleCreateInputSchema,
} from '@vubon/shared-schemas/platform/notification';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class ScheduleValidator {
  static validateSchedule(input: unknown) {
    try {
      return NotificationScheduleSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Schedule');
      throw e;
    }
  }

  static validateCreateInput(input: unknown) {
    try {
      return NotificationScheduleCreateInputSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Schedule.create');
      throw e;
    }
  }

  static validateFutureDate(input: unknown): string {
    const schema = z.string().datetime();
    try {
      const value = schema.parse(input);
      if (new Date(value).getTime() <= Date.now()) {
        throw new ApplicationValidationError(
          'Scheduled time must be in the future',
          'scheduledAt',
        );
      }
      return value;
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Schedule.scheduledAt');
      throw e;
    }
  }
}
