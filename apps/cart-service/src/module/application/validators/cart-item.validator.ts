/**
 * CartItemValidator — Zod schema-based validation
 * @module cart-service/application/validators
 */
import {
  AddItemRequestSchema,
  UpdateItemRequestSchema,
  RemoveItemRequestSchema,
  UpdateQuantityRequestSchema,
  SelectItemRequestSchema,
  MoveToSavedRequestSchema,
} from '../dtos/requests/item/index.js';
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

export class CartItemValidator {
  static validateAdd(input: unknown) {
    try {
      return AddItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'CartItem.add');
      throw e;
    }
  }

  static validateUpdate(input: unknown) {
    try {
      return UpdateItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'CartItem.update');
      throw e;
    }
  }

  static validateRemove(input: unknown) {
    try {
      return RemoveItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'CartItem.remove');
      throw e;
    }
  }

  static validateQuantity(input: unknown) {
    try {
      return UpdateQuantityRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'CartItem.quantity');
      throw e;
    }
  }

  static validateSelect(input: unknown) {
    try {
      return SelectItemRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'CartItem.select');
      throw e;
    }
  }

  static validateMoveToSaved(input: unknown) {
    try {
      return MoveToSavedRequestSchema.parse(input);
    } catch (e) {
      if (isZodError(e)) throw zodToAppError(e, 'CartItem.moveToSaved');
      throw e;
    }
  }
}
