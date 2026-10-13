/**
 * Inventory Domain Errors
 * @module product-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InventoryNotFoundError extends NotFoundError {
  constructor(inventoryId: string) {
    super('Inventory', inventoryId);
    this.name = 'InventoryNotFoundError';
  }
}

export class InsufficientStockError extends BusinessRuleError {
  constructor(productId: string, available: number, requested: number) {
    super(
      `Insufficient stock for "${productId}": available ${available}, requested ${requested}`,
      'INSUFFICIENT_STOCK',
      { productId, available, requested },
    );
    this.name = 'InsufficientStockError';
  }
}

export class NegativeStockError extends ValidationError {
  constructor(attempted: number) {
    super(`Stock cannot be negative (attempted: ${attempted})`, 'quantity');
    this.name = 'NegativeStockError';
  }
}

export class StockLimitExceededError extends ValidationError {
  constructor(limit: number, attempted: number) {
    super(`Stock limit exceeded: max ${limit}, attempted ${attempted}`, 'quantity');
    this.name = 'StockLimitExceededError';
  }
}

export class InvalidInventoryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid inventory status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidInventoryStatusError';
  }
}
