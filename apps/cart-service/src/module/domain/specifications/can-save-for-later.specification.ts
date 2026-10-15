/**
 * CanSaveForLaterSpecification
 * @module cart-service/domain/specifications
 *
 * Rules:
 *  - Cart modifiable
 *  - Item belongs to cart
 *  - Item not already saved
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { CartEntity } from '../entities/cart.entity.js';
import type { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CanSaveForLaterContext {
  readonly cart: CartEntity;
  readonly item: CartItemEntity;
  readonly alreadySaved: boolean;
}

export class CanSaveForLaterSpecification extends Specification<CanSaveForLaterContext> {
  isSatisfiedBy(c: CanSaveForLaterContext): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanSaveForLaterContext): string | null {
    const { cart, item, alreadySaved } = c;

    if (!cart.canBeModified()) {
      return `Cart cannot be modified (status: ${cart.status.value})`;
    }

    if (item.cartId.value !== cart.id) {
      return 'Item does not belong to this cart';
    }

    if (item.isRemoved()) {
      return 'Item is already removed';
    }

    if (alreadySaved) {
      return 'Item is already saved for later';
    }

    return null;
  }

  static strict(): CanSaveForLaterSpecification {
    return new CanSaveForLaterSpecification();
  }
}
