/**
 * CartValidator — Zod schema-based validation
 * @module cart-service/application/validators
 *
 * Pattern:
 *  - Zod → ApplicationValidationError
 *  - Duck-typed ZodError detection (cross-package safe)
 */
import {
  CreateCartRequestSchema,
  UpdateCartRequestSchema,
  ClearCartRequestSchema,
  DeleteCartRequestSchema,
  RecoverCartRequestSchema,
} from '../dtos/requests/cart/index.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

// ─── ZodError duck-typing (version-agnostic) ───
interface ZodIssueLike {
  readonly path: readonly (string | number)[];
  readonly message: string;
}
interface ZodErrorLike {
  readonly issues: readonly ZodIssueLike[];
}

function isZodError(e: unknown): e is ZodErrorLike {
  return (
    typeof e === 'object' &&
    e !== null &&
    'issues' in e &&
    Array.isArray((e as { issues: unknown }).issues)
  );
}

function zodToAppError(err: ZodErrorLike, scope: string): ApplicationValidationError {
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

export class CartValidator {
  static validateCreate(input: unknown) {
    try {
      return CreateCartRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cart.create');
      throw e;
    }
  }

  static validateUpdate(input: unknown) {
    try {
      return UpdateCartRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cart.update');
      throw e;
    }
  }

  static validateClear(input: unknown) {
    try {
      return ClearCartRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cart.clear');
      throw e;
    }
  }

  static validateDelete(input: unknown) {
    try {
      return DeleteCartRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cart.delete');
      throw e;
    }
  }

  static validateRecover(input: unknown) {
    try {
      return RecoverCartRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Cart.recover');
      throw e;
    }
  }
}
