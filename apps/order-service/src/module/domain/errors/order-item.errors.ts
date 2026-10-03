/**
 * Order item domain errors
 * @module order-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class OrderItemNotFoundError extends NotFoundError {
  constructor(itemId: string) {
    super('OrderItem', itemId);
    this.name = 'OrderItemNotFoundError';
  }
}

export class InvalidQuantityError extends ValidationError {
  constructor(message: string) {
    super(message, 'quantity');
    this.name = 'InvalidQuantityError';
  }
}

export class InvalidPriceError extends ValidationError {
  constructor(message: string) {
    super(message, 'price');
    this.name = 'InvalidPriceError';
  }
}

export class InvalidOrderItemStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order item status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidOrderItemStatusError';
  }
}

export class InvalidOrderItemTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order item type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidOrderItemTypeError';
  }
}

export class ItemAlreadyExistsError extends ConflictError {
  constructor(productId: string, variantId?: string) {
    super(
      `Item for product "${productId}"${variantId ? ` / variant "${variantId}"` : ''} already exists in order`,
      'productId',
    );
    this.name = 'ItemAlreadyExistsError';
  }
}

export class ItemLimitExceededError extends BusinessRuleError {
  constructor(count: number, max: number) {
    super(
      `Order has ${count} items, max is ${max}`,
      'ORDER_ITEM_LIMIT_EXCEEDED',
      { count, max },
    );
    this.name = 'ItemLimitExceededError';
  }
}
