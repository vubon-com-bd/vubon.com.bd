/**
 * Cart Application Errors
 * @module cart-service/application/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

// ─── Not Found (404) ──────────────────────
export class CartNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(cartId: string) {
    super('Cart', cartId);
    this.name = 'CartNotFoundApplicationError';
  }
}

// ─── Conflict (409) ───────────────────────
export class CartAlreadyExistsApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`Active cart for user "${userId}" already exists`, { userId });
    this.name = 'CartAlreadyExistsApplicationError';
  }
}

export class CartIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.DUPLICATE_REQUEST;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'CartIdempotencyConflictError';
  }
}

// ─── Command errors (400) ─────────────────
export class CartCreationError extends CommandError {
  constructor(reason: string) {
    super(`Cart creation failed: ${reason}`, 'CartCreation', undefined);
    this.name = 'CartCreationError';
  }
}

export class CartModificationError extends CommandError {
  constructor(cartId: string, reason: string) {
    super(`Cart modification failed: ${reason}`, 'CartModification', undefined);
    void cartId;
    this.name = 'CartModificationError';
  }
}

export class CartClearError extends CommandError {
  constructor(cartId: string, reason: string) {
    super(`Cart clear failed: ${reason}`, 'CartClear', undefined);
    void cartId;
    this.name = 'CartClearError';
  }
}

export class CartDeleteError extends CommandError {
  constructor(cartId: string, reason: string) {
    super(`Cart delete failed: ${reason}`, 'CartDelete', undefined);
    void cartId;
    this.name = 'CartDeleteError';
  }
}

// ─── Query errors (400) ───────────────────
export class CartQueryError extends QueryError {
  constructor(reason: string) {
    super(`Cart query failed: ${reason}`, 'CartQuery', undefined);
    this.name = 'CartQueryError';
  }
}

// ─── Business rule (400) ──────────────────
export class CartNotModifiableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(cartId: string, status: string) {
    super(`Cart "${cartId}" cannot be modified (status: ${status})`, {
      cartId,
      status,
    });
    this.name = 'CartNotModifiableApplicationError';
  }
}

export class CartExpiredApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 410;

  constructor(cartId: string, expiredAt: string) {
    super(`Cart "${cartId}" expired at ${expiredAt}`, { cartId, expiredAt });
    this.name = 'CartExpiredApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class CartValidationApplicationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CartValidationApplicationError';
  }
}
