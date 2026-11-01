/**
 * Price Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InvalidPriceError extends ValidationError {
  constructor(value: number) {
    super(`Invalid price: ${value}. Price must be non-negative`, 'price');
    this.name = 'InvalidPriceError';
  }
}

export class CurrencyMismatchError extends ValidationError {
  constructor(expected: string, actual: string) {
    super(`Currency mismatch: expected ${expected}, actual ${actual}`, 'currency');
    this.name = 'CurrencyMismatchError';
  }
}

export class PriceChangedError extends BusinessRuleError {
  constructor(productId: string, oldPrice: number, newPrice: number) {
    super(
      `Price for "${productId}" changed: ${oldPrice} → ${newPrice}`,
      'PRICE_CHANGED',
      { productId, oldPrice, newPrice },
    );
    this.name = 'PriceChangedError';
  }
}

export class PriceSyncFailedError extends BusinessRuleError {
  constructor(productId: string, reason: string) {
    super(`Price sync failed for "${productId}": ${reason}`, 'PRICE_SYNC_FAILED', {
      productId,
      reason,
    });
    this.name = 'PriceSyncFailedError';
  }
}

export class ProductUnavailableError extends BusinessRuleError {
  constructor(productId: string) {
    super(`Product "${productId}" is unavailable`, 'PRODUCT_UNAVAILABLE', {
      productId,
    });
    this.name = 'ProductUnavailableError';
  }
}
