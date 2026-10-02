/**
 * Price domain errors
 * @module cart-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';

export class PriceChangedError extends ConflictError {
  constructor(productId: string, oldPrice: number, newPrice: number) {
    super(
      `Price changed for product "${productId}": ${oldPrice} → ${newPrice}`,
      'price',
    );
    this.name = 'PriceChangedError';
  }
}

export class ProductUnavailableError extends ConflictError {
  constructor(productId: string) {
    super(`Product "${productId}" is no longer available`, 'availability');
    this.name = 'ProductUnavailableError';
  }
}
