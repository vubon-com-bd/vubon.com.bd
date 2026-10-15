/**
 * Cart Domain Errors
 * @module cart-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class CartNotFoundError extends NotFoundError {
  constructor(cartId: string) {
    super('Cart', cartId);
    this.name = 'CartNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class CartAlreadyExistsError extends ConflictError {
  constructor(userId: string) {
    super(`Cart for user "${userId}" already exists`, 'userId');
    this.name = 'CartAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidCartStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid cart status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCartStatusError';
  }
}

export class InvalidCartTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid cart type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidCartTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidCartStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, cartId?: string) {
    super(
      `Cannot transition cart status from "${from}" to "${to}"`,
      'INVALID_CART_STATUS_TRANSITION',
      { from, to, cartId },
    );
    this.name = 'InvalidCartStatusTransitionError';
  }
}

export class CartCannotBeModifiedError extends BusinessRuleError {
  constructor(cartId: string, status: string) {
    super(
      `Cart "${cartId}" cannot be modified in status "${status}"`,
      'CART_CANNOT_BE_MODIFIED',
      { cartId, status },
    );
    this.name = 'CartCannotBeModifiedError';
  }
}

export class CartExpiredError extends BusinessRuleError {
  constructor(cartId: string, expiredAt: string) {
    super(`Cart "${cartId}" expired at ${expiredAt}`, 'CART_EXPIRED', {
      cartId,
      expiredAt,
    });
    this.name = 'CartExpiredError';
  }
}

export class CartEmptyError extends BusinessRuleError {
  constructor(cartId: string) {
    super(`Cart "${cartId}" is empty`, 'CART_EMPTY', { cartId });
    this.name = 'CartEmptyError';
  }
}

export class CartNotActiveError extends BusinessRuleError {
  constructor(cartId: string, status: string) {
    super(
      `Cart "${cartId}" is not active (current: ${status})`,
      'CART_NOT_ACTIVE',
      { cartId, status },
    );
    this.name = 'CartNotActiveError';
  }
}

export class IdempotencyConflictError extends ConflictError {
  constructor(idempotencyKey: string, existingId: string) {
    super(
      `Idempotency key "${idempotencyKey}" already used for "${existingId}"`,
      'idempotencyKey',
    );
    this.name = 'IdempotencyConflictError';
  }
}
