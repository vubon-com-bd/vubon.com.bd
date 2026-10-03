/**
 * CartEligibilityService — checkout & eligibility rules
 * @module cart-service/domain/services
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CART } from '@vubon/shared-constants/business/cart';

export interface EligibilityCheck {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

export interface CheckoutEligibilityInput {
  readonly cart: CartEntity;
  readonly minimumOrderAmount?: number;
  readonly now?: Date;
}

export class CartEligibilityService {
  /**
   * Check whether a cart can proceed to checkout. Returns all blocking reasons.
   */
  checkCheckoutEligibility(input: CheckoutEligibilityInput): EligibilityCheck {
    const reasons: string[] = [];
    const cart = input.cart;

    if (!cart.isActive()) {
      reasons.push(`Cart status is "${cart.status.value}" — must be active`);
    }
    if (cart.isEmpty) {
      reasons.push('Cart is empty');
    }
    if (cart.isExpired(input.now)) {
      reasons.push('Cart has expired');
    }
    if (!cart.items.every((i) => i.isPurchasable())) {
      reasons.push('One or more items are unavailable');
    }
    if (cart.items.length > CART.LIMIT.MAX_ITEMS) {
      reasons.push(`Exceeds max ${CART.LIMIT.MAX_ITEMS} items`);
    }
    if (
      input.minimumOrderAmount !== undefined &&
      cart.totals.subtotal < input.minimumOrderAmount
    ) {
      reasons.push(
        `Subtotal ${cart.totals.subtotal} below minimum ${input.minimumOrderAmount}`,
      );
    }

    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Convenience boolean.
   */
  canCheckout(input: CheckoutEligibilityInput): boolean {
    return this.checkCheckoutEligibility(input).eligible;
  }

  /**
   * Whether the cart qualifies for free shipping given a threshold.
   */
  qualifiesForFreeShipping(cart: CartEntity, threshold: number): boolean {
    if (threshold <= 0) return false;
    return cart.totals.subtotal >= threshold;
  }

  /**
   * Which items are ready for checkout (available + purchasable + not removed).
   */
  checkoutableItems(cart: CartEntity): number {
    return cart.items.filter((i) => i.isPurchasable()).length;
  }

  /**
   * Guest checkout allowed?
   */
  canGuestCheckout(): boolean {
    return CART.LIMIT.ALLOW_GUEST_CHECKOUT;
  }
}
