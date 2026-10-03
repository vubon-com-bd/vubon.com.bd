/**
 * CanSaveForLater Specification
 * @module cart-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CartItemEntity } from '../entities/cart-item.entity.js';
import { CartEntity } from '../entities/cart.entity.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';

export interface SaveForLaterContext {
  readonly userId: CartUserIdVO;
  readonly existingSavedCount: number;
  readonly maxSavedItems?: number;
}

export class CanSaveForLaterSpecification extends Specification<
  { cart: CartEntity; item: CartItemEntity; ctx: SaveForLaterContext }
> {
  private static readonly DEFAULT_MAX = 100;

  isSatisfiedBy(candidate: {
    cart: CartEntity;
    item: CartItemEntity;
    ctx: SaveForLaterContext;
  }): boolean {
    const { cart, item, ctx } = candidate;

    // Cart must belong to this user (so we don't move someone else's item)
    if (!cart.userId) return false;
    if (cart.userId.value !== ctx.userId.value) return false;

    // Item must exist and be removable
    if (item.status.isRemoved()) return false;

    // Respect max-saved limit
    const max = ctx.maxSavedItems ?? CanSaveForLaterSpecification.DEFAULT_MAX;
    if (ctx.existingSavedCount >= max) return false;

    return true;
  }

  explain(candidate: {
    cart: CartEntity;
    item: CartItemEntity;
    ctx: SaveForLaterContext;
  }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { cart, item, ctx } = candidate;
    if (!cart.userId) return 'cart has no user';
    if (cart.userId.value !== ctx.userId.value) return 'user mismatch';
    if (item.status.isRemoved()) return 'item already removed';
    const max = ctx.maxSavedItems ?? CanSaveForLaterSpecification.DEFAULT_MAX;
    if (ctx.existingSavedCount >= max) return `saved limit ${max} reached`;
    return 'unknown reason';
  }
}
