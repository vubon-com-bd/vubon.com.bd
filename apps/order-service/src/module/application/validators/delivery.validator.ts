/**
 * DeliveryValidator
 */
import {
  ScheduleDeliveryRequestSchema,
  RescheduleDeliveryRequestSchema,
  ConfirmDeliveryRequestSchema,
} from '@vubon/shared-schemas/business/order';
import { ZodError } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    first?.path?.join('.') || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

export class DeliveryValidator {
  static validateSchedule(input: unknown) {
    try { return ScheduleDeliveryRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Delivery.schedule'); throw e; }
  }
  static validateReschedule(input: unknown) {
    try { return RescheduleDeliveryRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Delivery.reschedule'); throw e; }
  }
  static validateConfirm(input: unknown) {
    try { return ConfirmDeliveryRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Delivery.confirm'); throw e; }
  }
}
