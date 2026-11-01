/**
 * DeliveryValidator — Zod schema-based validation
 * @module order-service/application/validators
 */
import {
  ScheduleDeliveryRequestSchema,
  RescheduleDeliveryRequestSchema,
  ConfirmDeliveryRequestSchema,
} from '@vubon/shared-schemas/business';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

interface ZodLikeError {
  readonly issues: readonly {
    readonly path: readonly (string | number)[];
    readonly message: string;
  }[];
}

function isZodError(e: unknown): e is ZodLikeError {
  return (
    e !== null &&
    typeof e === 'object' &&
    'issues' in e &&
    Array.isArray((e as { issues: unknown }).issues)
  );
}

function zodToAppError(err: ZodLikeError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class DeliveryValidator {
  static validateSchedule(input: unknown) {
    try {
      return ScheduleDeliveryRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Delivery.schedule');
      throw e;
    }
  }

  static validateReschedule(input: unknown) {
    try {
      return RescheduleDeliveryRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Delivery.reschedule');
      throw e;
    }
  }

  static validateConfirm(input: unknown) {
    try {
      return ConfirmDeliveryRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Delivery.confirm');
      throw e;
    }
  }
}
