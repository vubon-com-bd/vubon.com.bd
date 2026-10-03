/**
 * Cart domain errors
 * @module cart-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CartNotFoundError extends NotFoundError {
  constructor(cartId: string) {
    super('Cart', cartId);
    this.name = 'CartNotFoundError';
  }
}

export class CartEmptyError extends BusinessRuleError {
  constructor(cartId: string) {
    super(`Cart "${cartId}" is empty`, 'CART_EMPTY', { cartId });
    this.name = 'CartEmptyError';
  }
}

export class CartExpiredError extends ConflictError {
  constructor(cartId: string) {
    super(`Cart "${cartId}" has expired`, 'expiresAt');
    this.name = 'CartExpiredError';
  }
}

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
