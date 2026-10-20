/**
 * Order Item Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class OrderItemNotFoundError extends NotFoundError {
  constructor(itemId: string) {
    super('OrderItem', itemId);
    this.name = 'OrderItemNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidOrderItemQuantityError extends ValidationError {
  constructor(quantity: number, min: number, max: number) {
    super(`Order item quantity ${quantity} must be between ${min} and ${max}`, 'quantity');
    this.name = 'InvalidOrderItemQuantityError';
  }
}

export class InvalidOrderItemPriceError extends ValidationError {
  constructor(price: number) {
    super(`Order item price ${price} cannot be negative`, 'price');
    this.name = 'InvalidOrderItemPriceError';
  }
}

export class InvalidOrderItemStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order item status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidOrderItemStatusError';
  }
}

// ─── Business Rule (400) ───────────────────
export class OrderItemNotCancellableError extends BusinessRuleError {
  constructor(itemId: string, status: string) {
    super(
      `Order item "${itemId}" cannot be cancelled in status "${status}"`,
      'ORDER_ITEM_CANNOT_BE_CANCELLED',
      { itemId, status },
    );
    this.name = 'OrderItemNotCancellableError';
  }
}

export class OrderItemNotReturnableError extends BusinessRuleError {
  constructor(itemId: string, status: string) {
    super(
      `Order item "${itemId}" cannot be returned in status "${status}"`,
      'ORDER_ITEM_CANNOT_BE_RETURNED',
      { itemId, status },
    );
    this.name = 'OrderItemNotReturnableError';
  }
}

export class InvalidOrderItemStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, itemId?: string) {
    super(
      `Cannot transition order item status from "${from}" to "${to}"`,
      'INVALID_ORDER_ITEM_STATUS_TRANSITION',
      { from, to, itemId },
    );
    this.name = 'InvalidOrderItemStatusTransitionError';
  }
}
