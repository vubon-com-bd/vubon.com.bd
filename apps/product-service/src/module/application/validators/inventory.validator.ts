/**
 * InventoryValidator
 * @module product-service/application/validators
 */
import { ZodError } from 'zod';
import {
  UpdateInventoryRequestSchema,
  SetInventoryRequestSchema,
} from '@vubon/shared-schemas/business';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

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

export class InventoryValidator {
  static validateUpdate(input: unknown) {
    try {
      return UpdateInventoryRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Inventory.update');
      throw e;
    }
  }

  static validateSet(input: unknown) {
    try {
      return SetInventoryRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Inventory.set');
      throw e;
    }
  }
}
