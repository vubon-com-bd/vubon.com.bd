/**
 * TemplateValidator — Zod schema-based validation
 * @module notification-service/application/validators
 */
import { ZodError } from 'zod';
import {
  NotificationTemplateSchema,
  NotificationTemplateTypeSchema,
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

export class TemplateValidator {
  static validateTemplate(input: unknown) {
    try {
      return NotificationTemplateSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Template');
      throw e;
    }
  }

  static validateType(input: unknown): string {
    try {
      return NotificationTemplateTypeSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Template.type');
      throw e;
    }
  }
}
