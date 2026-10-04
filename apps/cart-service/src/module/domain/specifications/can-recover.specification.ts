/**
 * CanRecover Specification — abandoned cart recovery
 * @module cart-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { AbandonedCartEntity } from '../entities/abandoned-cart.entity.js';
import { ABANDONED_CART } from '@vubon/shared-constants/business/cart';

export interface RecoverContext {
  readonly now?: Date;
  readonly maxRecoveryWindowDays?: number;
}

export class CanRecoverSpecification extends Specification<
  { abandonedCart: AbandonedCartEntity; ctx?: RecoverContext }
> {
  isSatisfiedBy(candidate: {
    abandonedCart: AbandonedCartEntity;
    ctx?: RecoverContext;
  }): boolean {
    const { abandonedCart, ctx } = candidate;
    const now = ctx?.now ?? new Date();
    const windowDays =
      ctx?.maxRecoveryWindowDays ?? ABANDONED_CART.EXPIRY_DAYS;

    if (abandonedCart.status.isFinal()) return false;
    if (abandonedCart.status.isUnsubscribed()) return false;

    const daysSince =
      (now.getTime() - Date.parse(abandonedCart.abandonedAt)) /
      (1000 * 60 * 60 * 24);

    if (daysSince > windowDays) return false;

    return true;
  }

  explain(candidate: {
    abandonedCart: AbandonedCartEntity;
    ctx?: RecoverContext;
  }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { abandonedCart, ctx } = candidate;
    const now = ctx?.now ?? new Date();
    const windowDays =
      ctx?.maxRecoveryWindowDays ?? ABANDONED_CART.EXPIRY_DAYS;

    if (abandonedCart.status.isRecovered()) return 'already recovered';
    if (abandonedCart.status.isLost()) return 'marked lost';
    if (abandonedCart.status.isUnsubscribed()) return 'user unsubscribed';

    const daysSince =
      (now.getTime() - Date.parse(abandonedCart.abandonedAt)) /
      (1000 * 60 * 60 * 24);
    if (daysSince > windowDays) return `recovery window (${windowDays}d) exceeded`;

    return 'unknown reason';
  }

  /** Days remaining in the recovery window; 0 if exhausted. */
  daysRemaining(abandonedCart: AbandonedCartEntity, now: Date = new Date()): number {
    const windowDays = ABANDONED_CART.EXPIRY_DAYS;
    const daysSince =
      (now.getTime() - Date.parse(abandonedCart.abandonedAt)) /
      (1000 * 60 * 60 * 24);
    return Math.max(0, Math.floor(windowDays - daysSince));
  }
}
