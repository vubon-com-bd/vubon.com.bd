/**
 * ProductValidator — Zod schema-based validation
 * @module product-service/application/validators
 *
 * Uses shared-schemas as single source of truth.
 */
import { ZodError } from 'zod';
import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
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

export class ProductValidator {
  static validateCreate(input: unknown) {
    try {
      return CreateProductRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Product.create');
      throw e;
    }
  }

  static validateUpdate(input: unknown) {
    try {
      return UpdateProductRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Product.update');
      throw e;
    }
  }
}
