/**
 * CanCheckoutSpecification
 * @module cart-service/domain/specifications
 *
 * Rules:
 *  - Cart active + non-empty
 *  - Not expired
 *  - Has at least one purchasable item
 *  - Total > 0
 *  - Currency consistent
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { CartEntity } from '../entities/cart.entity.js';
import type { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CanCheckoutContext {
  readonly cart: CartEntity;
  readonly items: readonly CartItemEntity[];
}

export class CanCheckoutSpecification extends Specification<CanCheckoutContext> {
  isSatisfiedBy(c: CanCheckoutContext): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanCheckoutContext): string | null {
    const { cart, items } = c;

    if (!cart.isActive()) {
      return `Cart status "${cart.status.value}" is not active`;
    }

    if (cart.isExpiredAt()) {
      return 'Cart has expired';
    }

    if (items.length === 0) {
      return 'Cart is empty';
    }

    const purchasable = items.filter((i) => i.isPurchasable());
    if (purchasable.length === 0) {
      return 'No purchasable items in cart';
    }

    if (cart.total <= 0) {
      return 'Cart total must be greater than zero';
    }

    const currencies = new Set(items.map((i) => i.currency));
    if (currencies.size > 1) {
      return `Cart has mixed currencies: ${Array.from(currencies).join(', ')}`;
    }

    return null;
  }

  static strict(): CanCheckoutSpecification {
    return new CanCheckoutSpecification();
  }
}
