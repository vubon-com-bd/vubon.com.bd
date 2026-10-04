/**
 * Abandoned cart domain errors
 * @module cart-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';

export class AbandonedCartNotFoundError extends NotFoundError {
  constructor(abandonedCartId: string) {
    super('AbandonedCart', abandonedCartId);
    this.name = 'AbandonedCartNotFoundError';
  }
}

export class CartAlreadyAbandonedError extends ConflictError {
  constructor(cartId: string) {
    super(`Cart "${cartId}" is already abandoned`, 'status');
    this.name = 'CartAlreadyAbandonedError';
  }
}

export class InvalidAbandonedCartStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid abandoned cart status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidAbandonedCartStatusError';
  }
}

export class InvalidReminderTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid reminder type "${value}". Allowed: ${allowed.join(', ')}`, 'reminderType');
    this.name = 'InvalidReminderTypeError';
  }
}
