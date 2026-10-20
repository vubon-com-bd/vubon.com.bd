/**
 * OrderValidator — Zod schema-based validation
 * @module order-service/application/validators
 *
 * ⚠️ Uses duck-typing for ZodError check (multiple zod instances safe).
 */
import {
  CreateOrderRequestSchema,
  UpdateOrderRequestSchema,
  DeleteOrderRequestSchema,
  ConfirmOrderStatusRequestSchema,
  HoldOrderRequestSchema,
  ReleaseOrderRequestSchema,
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
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class OrderValidator {
  static validateCreate(input: unknown) {
    try {
      return CreateOrderRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Order.create');
      throw e;
    }
  }

  static validateUpdate(input: unknown) {
    try {
      return UpdateOrderRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Order.update');
      throw e;
    }
  }

  static validateDelete(input: unknown) {
    try {
      return DeleteOrderRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Order.delete');
      throw e;
    }
  }

  static validateConfirm(input: unknown) {
    try {
      return ConfirmOrderStatusRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Order.confirm');
      throw e;
    }
  }

  static validateHold(input: unknown) {
    try {
      return HoldOrderRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Order.hold');
      throw e;
    }
  }

  static validateRelease(input: unknown) {
    try {
      return ReleaseOrderRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'Order.release');
      throw e;
    }
  }
}
