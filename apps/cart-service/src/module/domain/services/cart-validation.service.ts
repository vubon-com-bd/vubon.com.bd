/**
 * CartValidationService — validate item-add requests
 * @module cart-service/domain/services
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemQuantityVO } from '../value-objects/primitives/cart-item-quantity.vo.js';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { InsufficientStockError } from '../errors/cart-item.errors.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface AddItemValidationInput {
  readonly cart: CartEntity;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly availableStock: number;
  readonly price: number;
  readonly isAvailable: boolean;
  readonly now?: Date;
}

export interface ValidationResult {
  readonly allowed: boolean;
  readonly reason?: string;
  readonly errorCode?: string;
}

export class CartValidationService {
  /**
   * Validate whether an item can be added. Returns structured result;
   * callers throw with the right error if needed.
   */
  validateAddItem(input: AddItemValidationInput): ValidationResult {
    const { cart } = input;

    if (!cart.isActive()) {
      return {
        allowed: false,
        reason: `Cart is not active (status: ${cart.status.value})`,
        errorCode: 'CART_NOT_ACTIVE',
      };
    }
    if (cart.isExpired(input.now)) {
      return {
        allowed: false,
        reason: 'Cart has expired',
        errorCode: 'CART_EXPIRED',
      };
    }
    if (!cart.canAcceptMoreItems()) {
      return {
        allowed: false,
        reason: `Cart reached max of ${CART_LIMIT.MAX_ITEMS} items`,
        errorCode: 'CART_ITEM_LIMIT_EXCEEDED',
      };
    }
    if (!input.isAvailable) {
      return {
        allowed: false,
        reason: 'Product is unavailable',
        errorCode: 'PRODUCT_UNAVAILABLE',
      };
    }
    if (input.price < 0) {
      return {
        allowed: false,
        reason: 'Price cannot be negative',
        errorCode: 'INVALID_PRICE',
      };
    }
    if (!Number.isInteger(input.quantity) || input.quantity < 1) {
      return {
        allowed: false,
        reason: 'Quantity must be a positive integer',
        errorCode: 'INVALID_QUANTITY',
      };
    }

    // Stock check against existing cart quantity
    const existing = cart.findItemByProduct(input.productId, input.variantId);
    const existingQty = existing?.quantity.value ?? 0;
    const requestedTotal = existingQty + input.quantity;

    if (requestedTotal > CART_LIMIT.MAX_QUANTITY_PER_ITEM) {
      return {
        allowed: false,
        reason: `Quantity would exceed max ${CART_LIMIT.MAX_QUANTITY_PER_ITEM}`,
        errorCode: 'MAX_QUANTITY_EXCEEDED',
      };
    }
    if (requestedTotal > input.availableStock) {
      return {
        allowed: false,
        reason: `Only ${input.availableStock} in stock, requested ${requestedTotal}`,
        errorCode: 'INSUFFICIENT_STOCK',
      };
    }

    return { allowed: true };
  }

  /** Throws the right domain error if add item is not allowed. */
  assertCanAddItem(input: AddItemValidationInput): void {
    const result = this.validateAddItem(input);
    if (result.allowed) return;

    switch (result.errorCode) {
      case 'INSUFFICIENT_STOCK':
        throw new InsufficientStockError(
          input.productId,
          input.quantity,
          input.availableStock,
        );
      case 'MAX_QUANTITY_EXCEEDED':
        throw new BusinessRuleError(
          result.reason ?? 'Max quantity exceeded',
          'MAX_QUANTITY_EXCEEDED',
          { productId: input.productId },
        );
      case 'CART_ITEM_LIMIT_EXCEEDED':
        throw new BusinessRuleError(
          result.reason ?? 'Cart item limit exceeded',
          'CART_ITEM_LIMIT_EXCEEDED',
          { cartId: input.cart.id },
        );
      default:
        throw new ValidationError(result.reason ?? 'Invalid add-item request', 'item');
    }
  }

  /** Validate a quantity value against limits (before constructing VO). */
  validateQuantity(quantity: number): CartItemQuantityVO {
    return CartItemQuantityVO.create(quantity);
  }

  /** Cart must be non-empty to proceed with checkout-like actions. */
  assertNotEmpty(cart: CartEntity): void {
    if (cart.isEmpty) {
      throw new BusinessRuleError(
        `Cart "${cart.id}" is empty`,
        'CART_EMPTY',
        { cartId: cart.id },
      );
    }
  }
}
