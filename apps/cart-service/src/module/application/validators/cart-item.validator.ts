/**
 * CartItemValidator
 * @module cart-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';

export interface CartItemValidationInput {
  readonly productId: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency?: string;
}

export class CartItemValidator {
  static validateAdd(input: CartItemValidationInput): void {
    if (!input.productId || input.productId.length === 0) {
      throw new ApplicationValidationError('productId is required', 'productId');
    }
    if (!Number.isInteger(input.quantity)) {
      throw new ApplicationValidationError('quantity must be an integer', 'quantity');
    }
    if (input.quantity < CART_LIMIT.MIN_QUANTITY_PER_ITEM) {
      throw new ApplicationValidationError(
        `quantity must be at least ${CART_LIMIT.MIN_QUANTITY_PER_ITEM}`,
        'quantity',
      );
    }
    if (input.quantity > CART_LIMIT.MAX_QUANTITY_PER_ITEM) {
      throw new ApplicationValidationError(
        `quantity cannot exceed ${CART_LIMIT.MAX_QUANTITY_PER_ITEM}`,
        'quantity',
      );
    }
    if (!Number.isFinite(input.unitPrice) || input.unitPrice < 0) {
      throw new ApplicationValidationError(
        'unitPrice must be a non-negative number',
        'unitPrice',
      );
    }
    if (input.currency && input.currency.length !== 3) {
      throw new ApplicationValidationError(
        'Currency must be a 3-letter ISO 4217 code',
        'currency',
      );
    }
  }
}
