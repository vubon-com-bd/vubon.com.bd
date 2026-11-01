/**
 * CanUpdateInventorySpecification
 * @module product-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { INVENTORY } from '@vubon/shared-constants/business';
import type { ProductInventoryEntity } from '../entities/product-inventory.entity.js';

export interface UpdateInventoryContext {
  readonly delta: number;
  readonly reason: string;
  readonly actorRole?: 'admin' | 'vendor' | 'staff' | 'system';
}

export interface UpdateInventoryCandidate {
  readonly inventory: ProductInventoryEntity;
  readonly ctx: UpdateInventoryContext;
}

const VALID_REASONS = new Set([
  'restock',
  'adjustment',
  'damage',
  'loss',
  'return',
  'transfer',
  'correction',
  'system_sync',
]);

export class CanUpdateInventorySpecification extends Specification<UpdateInventoryCandidate> {
  isSatisfiedBy(c: UpdateInventoryCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: UpdateInventoryCandidate): string | null {
    const { inventory, ctx } = c;

    if (!Number.isInteger(ctx.delta)) {
      return 'adjustment delta must be an integer';
    }
    if (ctx.delta === 0) {
      return 'adjustment delta cannot be zero';
    }

    const next = inventory.quantity.value + ctx.delta;
    if (next < INVENTORY.MIN_STOCK) {
      return `adjustment would cause negative stock (${next})`;
    }
    if (next > INVENTORY.MAX_STOCK_PER_VARIANT) {
      return `adjustment exceeds max stock (${INVENTORY.MAX_STOCK_PER_VARIANT})`;
    }

    if (next < inventory.reserved.value) {
      return `next quantity (${next}) below reserved (${inventory.reserved.value})`;
    }

    if (!VALID_REASONS.has(ctx.reason)) {
      return `invalid reason "${ctx.reason}" — allowed: ${Array.from(VALID_REASONS).join(', ')}`;
    }

    if (ctx.actorRole === 'vendor' && ctx.delta > 0 && ctx.reason === 'restock') {
      // vendor can restock — ok
    }

    return null;
  }

  static default(): CanUpdateInventorySpecification {
    return new CanUpdateInventorySpecification();
  }
}
