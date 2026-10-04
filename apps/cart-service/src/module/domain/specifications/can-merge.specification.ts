/**
 * CanMerge Specification — guest cart → user cart
 * @module cart-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { GuestCartEntity } from '../entities/guest-cart.entity.js';
import { CartEntity } from '../entities/cart.entity.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';

export interface MergeContext {
  readonly targetCart: CartEntity;
  readonly userId: CartUserIdVO;
  readonly now?: Date;
}

export class CanMergeSpecification extends Specification<
  { guestCart: GuestCartEntity; ctx: MergeContext }
> {
  isSatisfiedBy(candidate: { guestCart: GuestCartEntity; ctx: MergeContext }): boolean {
    const { guestCart, ctx } = candidate;
    const now = ctx.now ?? new Date();

    if (!guestCart.canBeMerged()) return false;
    if (guestCart.isExpired(now)) return false;
    if (guestCart.itemCount === 0) return false;

    const target = ctx.targetCart;
    if (!target.isActive()) return false;
    if (!target.userId) return false;
    if (target.userId.value !== ctx.userId.value) return false;

    return true;
  }

  explain(candidate: { guestCart: GuestCartEntity; ctx: MergeContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { guestCart, ctx } = candidate;
    if (guestCart.isExpired(ctx.now)) return 'guest cart expired';
    if (!guestCart.canBeMerged()) return `guest cart status ${guestCart.status.value}`;
    if (guestCart.itemCount === 0) return 'guest cart empty';
    if (!ctx.targetCart.isActive()) return 'target cart not active';
    if (!ctx.targetCart.userId) return 'target cart has no user';
    if (ctx.targetCart.userId.value !== ctx.userId.value) return 'user mismatch';
    return 'unknown reason';
  }
}
