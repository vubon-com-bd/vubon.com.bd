/**
 * CouponValidator — Zod schema-based validation
 * @module cart-service/application/validators
 */
import {
  ApplyCouponRequestSchema,
  RemoveCouponRequestSchema,
  ValidateCouponRequestSchema,
} from '../dtos/requests/coupon/index.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

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

export class CouponValidator {
  static validateApply(input: unknown) {
    try {
      return ApplyCouponRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Coupon.apply');
      throw e;
    }
  }

  static validateRemove(input: unknown) {
    try {
      return RemoveCouponRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Coupon.remove');
      throw e;
    }
  }

  static validateValidate(input: unknown) {
    try {
      return ValidateCouponRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Coupon.validate');
      throw e;
    }
  }
}
