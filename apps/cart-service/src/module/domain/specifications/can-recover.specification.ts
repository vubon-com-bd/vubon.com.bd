/**
 * CanRecoverSpecification — Abandoned cart recovery
 * @module cart-service/domain/specifications
 *
 * Rules:
 *  - Abandoned cart status must be pending / reminded
 *  - Not already recovered / lost / unsubscribed
 *  - Cart value > 0
 *  - Cart still exists
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { AbandonedCartEntity } from '../entities/abandoned-cart.entity.js';
import type { CartEntity } from '../entities/cart.entity.js';

export interface CanRecoverContext {
  readonly abandoned: AbandonedCartEntity;
  readonly cart?: CartEntity | null;
}

export class CanRecoverSpecification extends Specification<CanRecoverContext> {
  isSatisfiedBy(c: CanRecoverContext): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanRecoverContext): string | null {
    const { abandoned, cart } = c;

    if (!abandoned.isRecoverable()) {
      return `Abandoned cart status "${abandoned.status.value}" is not recoverable`;
    }

    if (abandoned.cartValue <= 0) {
      return 'Abandoned cart value must be greater than zero';
    }

    if (cart && cart.isFinal()) {
      return `Original cart is already ${cart.status.value}`;
    }

    return null;
  }

  static strict(): CanRecoverSpecification {
    return new CanRecoverSpecification();
  }
}
