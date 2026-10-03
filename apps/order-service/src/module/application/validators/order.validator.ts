/**
 * OrderValidator — schema-based validation
 * @module order-service/application/validators
 */
import {
  CreateOrderRequestSchema,
  UpdateOrderRequestSchema,
  DeleteOrderRequestSchema,
  ConfirmOrderStatusRequestSchema,
  HoldOrderRequestSchema,
  ReleaseOrderRequestSchema,
} from '@vubon/shared-schemas/business/order';
import { ZodError } from 'zod';
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

export class OrderValidator {
  static validateCreate(input: unknown) {
    try { return CreateOrderRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Order.create'); throw e; }
  }
  static validateUpdate(input: unknown) {
    try { return UpdateOrderRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Order.update'); throw e; }
  }
  static validateDelete(input: unknown) {
    try { return DeleteOrderRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Order.delete'); throw e; }
  }
  static validateConfirm(input: unknown) {
    try { return ConfirmOrderStatusRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Order.confirm'); throw e; }
  }
  static validateHold(input: unknown) {
    try { return HoldOrderRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Order.hold'); throw e; }
  }
  static validateRelease(input: unknown) {
    try { return ReleaseOrderRequestSchema.parse(input); }
    catch (e) { if (e instanceof ZodError) throw zodToAppError(e, 'Order.release'); throw e; }
  }
}
