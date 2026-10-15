/**
 * CanAddItemSpecification
 * @module cart-service/domain/specifications
 *
 * Rules:
 *  - Cart must be modifiable
 *  - Cart must not be final / expired
 *  - Item count < MAX_ITEMS
 *  - Quantity within limits
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { CartEntity } from '../entities/cart.entity.js';
import type { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CanAddItemContext {
  readonly cart: CartEntity;
  readonly existingItems: readonly CartItemEntity[];
  readonly requestedQuantity: number;
}

const MAX_ITEMS = 100;
const MAX_QTY = 999;
const MIN_QTY = 1;

export class CanAddItemSpecification extends Specification<CanAddItemContext> {
  isSatisfiedBy(c: CanAddItemContext): boolean {
    return this.explain(c) === null;
  }

  /**
   * Returns null if satisfied, otherwise a human-readable reason.
   */
  explain(c: CanAddItemContext): string | null {
    const { cart, existingItems, requestedQuantity } = c;

    if (!cart.canBeModified()) {
      return `Cart cannot be modified (status: ${cart.status.value})`;
    }

    if (cart.isExpiredAt()) {
      return 'Cart has expired';
    }

    if (existingItems.length >= MAX_ITEMS) {
      return `Cart item limit reached (${MAX_ITEMS})`;
    }

    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity < MIN_QTY ||
      requestedQuantity > MAX_QTY
    ) {
      return `Quantity must be between ${MIN_QTY} and ${MAX_QTY}`;
    }

    return null;
  }

  static strict(): CanAddItemSpecification {
    return new CanAddItemSpecification();
  }
}
