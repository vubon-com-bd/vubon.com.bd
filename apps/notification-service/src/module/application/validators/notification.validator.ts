/**
 * NotificationValidator — Zod schema-based validation
 * @module notification-service/application/validators
 */
import { ZodError } from 'zod';
import {
  NotificationSchema,
  NotificationListFilterSchema,
  NotificationTypeSchema,
  NotificationChannelSchema,
  NotificationPrioritySchema,
  NotificationCategorySchema,
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

export class NotificationValidator {
  static validateNotification(input: unknown) {
    try {
      return NotificationSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Notification');
      throw e;
    }
  }

  static validateListFilter(input: unknown) {
    try {
      return NotificationListFilterSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Notification.listFilter');
      throw e;
    }
  }

  static validateType(input: unknown): string {
    try {
      return NotificationTypeSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Notification.type');
      throw e;
    }
  }

  static validateChannel(input: unknown): string {
    try {
      return NotificationChannelSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Notification.channel');
      throw e;
    }
  }

  static validatePriority(input: unknown): string {
    try {
      return NotificationPrioritySchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Notification.priority');
      throw e;
    }
  }

  static validateCategory(input: unknown): string {
    try {
      return NotificationCategorySchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Notification.category');
      throw e;
    }
  }
}
