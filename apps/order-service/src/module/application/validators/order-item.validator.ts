/**
 * OrderItemValidator
 */
import {
  AddOrderItemRequestSchema,
  UpdateOrderItemRequestSchema,
  RemoveOrderItemRequestSchema,
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

export class OrderItemValidator {
  static validateAdd(input: unknown) {
    try { return AddOrderItemRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'OrderItem.add'); throw e; }
  }
  static validateUpdate(input: unknown) {
    try { return UpdateOrderItemRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'OrderItem.update'); throw e; }
  }
  static validateRemove(input: unknown) {
    try { return RemoveOrderItemRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'OrderItem.remove'); throw e; }
  }
}
