/**
 * CartEligibilityService — Checkout eligibility logic
 * @module cart-service/domain/services
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CheckoutEligibility {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
  readonly blockingReasons: readonly string[];
  readonly warnings: readonly string[];
}

export class CartEligibilityService {
  static evaluate(
    cart: CartEntity,
    items: readonly CartItemEntity[],
  ): CheckoutEligibility {
    const blocking: string[] = [];
    const warnings: string[] = [];

    // ── Status ──────────────────────────────
    if (!cart.isActive()) {
      blocking.push(`Cart status is "${cart.status.value}", must be active`);
    }

    // ── Expiry ──────────────────────────────
    if (cart.isExpiredAt()) {
      blocking.push('Cart has expired');
    }

    // ── Empty cart ──────────────────────────
    if (items.length === 0) {
      blocking.push('Cart is empty');
    }

    // ── Non-purchasable items ───────────────
    const unavailable = items.filter((i) => !i.isPurchasable());
    if (unavailable.length > 0) {
      warnings.push(
        `${unavailable.length} item(s) unavailable and will be excluded`,
      );
    }

    const purchasable = items.filter((i) => i.isPurchasable());
    if (items.length > 0 && purchasable.length === 0) {
      blocking.push('No purchasable items in cart');
    }

    // ── Currency consistency ────────────────
    const currencies = new Set(items.map((i) => i.currency));
    if (currencies.size > 1) {
      blocking.push('Cart has mixed currencies');
    }

    // ── Total ───────────────────────────────
    if (cart.total <= 0 && purchasable.length > 0) {
      blocking.push('Cart total must be greater than zero');
    }

    return {
      eligible: blocking.length === 0,
      reasons: [...blocking, ...warnings],
      blockingReasons: blocking,
      warnings,
    };
  }

  static isEligibleForCheckout(
    cart: CartEntity,
    items: readonly CartItemEntity[],
  ): boolean {
    return this.evaluate(cart, items).eligible;
  }
}
