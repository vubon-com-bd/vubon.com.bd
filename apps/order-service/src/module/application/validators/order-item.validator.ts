/**
 * OrderItemValidator — Zod schema-based validation
 * @module order-service/application/validators
 */
import {
  AddOrderItemRequestSchema,
  UpdateOrderItemRequestSchema,
  RemoveOrderItemRequestSchema,
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

export class OrderItemValidator {
  static validateAdd(input: unknown) {
    try {
      return AddOrderItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'OrderItem.add');
      throw e;
    }
  }

  static validateUpdate(input: unknown) {
    try {
      return UpdateOrderItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'OrderItem.update');
      throw e;
    }
  }

  static validateRemove(input: unknown) {
    try {
      return RemoveOrderItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'OrderItem.remove');
      throw e;
    }
  }
}
