/**
 * VendorValidator — Zod schema-based validation
 * @module vendor-service/application/validators
 *
 * Uses shared-schemas as single source of truth.
 */
import { ZodError } from 'zod';
import {
  RegisterVendorRequestSchema,
  UpdateVendorRequestSchema,
} from '@vubon/shared-schemas/business/vendor';
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

export class VendorValidator {
  static validateRegister(input: unknown) {
    try {
      return RegisterVendorRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Vendor.register');
      throw e;
    }
  }

  static validateUpdate(input: unknown) {
    try {
      return UpdateVendorRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Vendor.update');
      throw e;
    }
  }
}
