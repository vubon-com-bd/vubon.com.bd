/**
 * CanMergeSpecification
 * @module cart-service/domain/specifications
 *
 * Rules:
 *  - Source != target
 *  - Both carts active
 *  - Source has items
 *  - Target modifiable
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { CartEntity } from '../entities/cart.entity.js';

export interface CanMergeContext {
  readonly source: CartEntity;
  readonly target: CartEntity;
}

export class CanMergeSpecification extends Specification<CanMergeContext> {
  isSatisfiedBy(c: CanMergeContext): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanMergeContext): string | null {
    const { source, target } = c;

    if (source.id === target.id) {
      return 'Source and target cart must differ';
    }

    if (!source.isActive()) {
      return `Source cart status "${source.status.value}" is not active`;
    }

    if (!target.isActive()) {
      return `Target cart status "${target.status.value}" is not active`;
    }

    if (source.isEmpty()) {
      return 'Source cart is empty';
    }

    if (!target.canBeModified()) {
      return 'Target cart cannot be modified';
    }

    return null;
  }

  static strict(): CanMergeSpecification {
    return new CanMergeSpecification();
  }
}
