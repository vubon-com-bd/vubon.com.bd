/**
 * Inventory domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class InventoryNotFoundError extends NotFoundError {
  constructor(inventoryId: string) {
    super('ProductInventory', inventoryId);
    this.name = 'InventoryNotFoundError';
  }
}

export class InsufficientStockError extends BusinessRuleError {
  constructor(available: number, requested: number) {
    super(`Insufficient stock: available ${available}, requested ${requested}`, 'INSUFFICIENT_STOCK', { available, requested });
    this.name = 'InsufficientStockError';
  }
}

export class InvalidQuantityError extends ValidationError {
  constructor(value: number, reason: string) {
    super(`Invalid quantity "${value}": ${reason}`, 'quantity');
    this.name = 'InvalidQuantityError';
  }
}

export class StockLimitExceededError extends BusinessRuleError {
  constructor(current: number, max: number) {
    super(`Stock limit exceeded: ${current}/${max}`, 'STOCK_LIMIT_EXCEEDED', { current, max });
    this.name = 'StockLimitExceededError';
  }
}
