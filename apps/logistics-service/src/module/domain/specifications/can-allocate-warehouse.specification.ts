/**
 * CanAllocateWarehouseSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: A warehouse can accept an allocation if:
 *   - Status is operational (active/full)
 *   - Has capacity for volume + weight
 *   - Zone matches (if provided)
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { WarehouseEntity } from '../entities/warehouse.entity.js';

export interface CanAllocateWarehouseContext {
  readonly volumeM3: number;
  readonly weightKg?: number;
  readonly zone?: string;
}

export type CanAllocateWarehouseCandidate = {
  readonly warehouse: WarehouseEntity;
  readonly ctx: CanAllocateWarehouseContext;
};

export class CanAllocateWarehouseSpecification extends Specification<CanAllocateWarehouseCandidate> {
  isSatisfiedBy(c: CanAllocateWarehouseCandidate): boolean {
    const { warehouse, ctx } = c;
    if (!warehouse.isOperational()) return false;
    if (!warehouse.canAcceptMore(ctx.volumeM3, ctx.weightKg)) return false;
    if (ctx.zone && warehouse.zone !== ctx.zone) return false;
    return true;
  }

  explain(c: CanAllocateWarehouseCandidate): string | null {
    const { warehouse, ctx } = c;
    if (!warehouse.isOperational()) {
      return `Warehouse status "${warehouse.status.value}" is not operational`;
    }
    if (!warehouse.canAcceptMore(ctx.volumeM3, ctx.weightKg)) {
      return `Insufficient capacity (used ${warehouse.usedCapacityM3 ?? 0}/${warehouse.capacityM3 ?? 0} m³)`;
    }
    if (ctx.zone && warehouse.zone !== ctx.zone) {
      return `Warehouse zone "${warehouse.zone}" does not match required zone "${ctx.zone}"`;
    }
    return null;
  }

  static strict(): CanAllocateWarehouseSpecification {
    return new CanAllocateWarehouseSpecification();
  }
}
