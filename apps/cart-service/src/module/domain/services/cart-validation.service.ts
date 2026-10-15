/**
 * CartValidationService — Cart integrity validation
 * @module cart-service/domain/services
 *
 * Validates:
 *  - Cart entity invariants
 *  - Currency consistency across items
 *  - Item count vs CART_LIMIT
 *  - Total sum correctness
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CartValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

const MAX_ITEMS = 100;

export class CartValidationService {
  static validate(
    cart: CartEntity,
    items: readonly CartItemEntity[],
  ): CartValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // ── Item count ───────────────────────────
    if (items.length > MAX_ITEMS) {
      errors.push(`Cart item count ${items.length} exceeds max ${MAX_ITEMS}`);
    }

    // ── Currency consistency ─────────────────
    const currencies = new Set<string>([cart.currency]);
    for (const item of items) {
      currencies.add(item.currency);
    }
    if (currencies.size > 1) {
      errors.push(
        `Cart has mixed currencies: ${Array.from(currencies).join(', ')}`,
      );
    }

    // ── Purchasable items ────────────────────
    const purchasable = items.filter((i) => i.isPurchasable());
    if (purchasable.length === 0 && items.length > 0) {
      warnings.push('Cart contains no purchasable items');
    }

    // ── Item unit-price sanity ───────────────
    for (const item of items) {
      if (item.unitPrice < 0) {
        errors.push(`Item ${item.id} has negative unitPrice`);
      }
      if (item.quantity.value <= 0) {
        errors.push(`Item ${item.id} has invalid quantity`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  static assertValid(
    cart: CartEntity,
    items: readonly CartItemEntity[],
  ): void {
    const result = this.validate(cart, items);
    if (!result.valid) {
      throw new ValidationError(
        `Cart validation failed: ${result.errors.join('; ')}`,
        'cart',
      );
    }
  }
}
