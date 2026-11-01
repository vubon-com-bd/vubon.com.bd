/**
 * CanAllocateStockSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: Inventory location can accept stock if:
 *  - Status = active (not quarantine)
 *  - Not in quarantine
 *  - Is pickable (if preferPickable)
 *  - Has capacity for weight + volume
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { InventoryLocationEntity } from '../entities/inventory-location.entity.js';

export interface CanAllocateStockContext {
  readonly weightKg: number;
  readonly volumeM3?: number;
  readonly requirePickable?: boolean;
}

export type CanAllocateStockCandidate = {
  readonly location: InventoryLocationEntity;
  readonly ctx: CanAllocateStockContext;
};

export class CanAllocateStockSpecification extends Specification<CanAllocateStockCandidate> {
  isSatisfiedBy(c: CanAllocateStockCandidate): boolean {
    const { location, ctx } = c;
    if (!location.isUsable) return false;
    if (location.isQuarantine) return false;
    if (ctx.requirePickable && !location.isPickable) return false;
    if (!location.canHold(ctx.weightKg, ctx.volumeM3)) return false;
    return true;
  }

  explain(c: CanAllocateStockCandidate): string | null {
    const { location, ctx } = c;
    if (!location.isUsable) {
      return `Inventory location "${location.id}" status is "${location.status.value}" (not usable)`;
    }
    if (location.isQuarantine) {
      return `Inventory location "${location.id}" is in quarantine`;
    }
    if (ctx.requirePickable && !location.isPickable) {
      return `Inventory location "${location.id}" is not pickable`;
    }
    if (!location.canHold(ctx.weightKg, ctx.volumeM3)) {
      return `Insufficient capacity (availableKg: ${location.availableKg()}, requested: ${ctx.weightKg})`;
    }
    return null;
  }

  static strict(): CanAllocateStockSpecification {
    return new CanAllocateStockSpecification();
  }
}
