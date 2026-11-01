/**
 * FulfillmentAllocationService
 * @module order-service/domain/services
 *
 * Pure domain service — allocates order items to warehouses/vendors.
 * Does NOT call inventory-service — caller provides stock snapshots.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { OrderItemVO } from '../value-objects/composites/order-item.vo.js';

export interface StockSnapshot {
  readonly warehouseId: string;
  readonly vendorId?: string;
  readonly itemId: string;
  readonly available: number;
}

export interface Allocation {
  readonly warehouseId: string;
  readonly vendorId?: string;
  readonly itemId: string;
  readonly allocated: number;
}

export interface Unallocated {
  readonly itemId: string;
  readonly requested: number;
  readonly available: number;
}

export interface AllocationResult {
  readonly allocations: readonly Allocation[];
  readonly unallocated: readonly Unallocated[];
  readonly fullyAllocated: boolean;
}

export class FulfillmentAllocationService {
  /**
   * Allocate items across available stock snapshots.
   * Greedy allocation by warehouse priority (order as given).
   */
  static allocate(
    items: readonly OrderItemVO[],
    stock: readonly StockSnapshot[],
  ): AllocationResult {
    if (!items || items.length === 0) {
      throw new BusinessRuleError(
        'Cannot allocate empty items',
        'INVALID_FULFILLMENT_ALLOCATION',
        { itemCount: 0 },
      );
    }

    const allocations: Allocation[] = [];
    const unallocated: Unallocated[] = [];

    for (const item of items) {
      let remaining = item.quantity.value;
      const stocks = stock.filter((s) => s.itemId === item.id.value);

      for (const s of stocks) {
        if (remaining <= 0) break;
        const take = Math.min(remaining, s.available);
        if (take <= 0) continue;
        allocations.push({
          warehouseId: s.warehouseId,
          vendorId: s.vendorId,
          itemId: s.itemId,
          allocated: take,
        });
        remaining -= take;
      }

      if (remaining > 0) {
        unallocated.push({
          itemId: item.id.value,
          requested: item.quantity.value,
          available: item.quantity.value - remaining,
        });
      }
    }

    return {
      allocations,
      unallocated,
      fullyAllocated: unallocated.length === 0,
    };
  }

  /**
   * Group allocations by warehouse (for shipment batching).
   */
  static groupByWarehouse(
    allocations: readonly Allocation[],
  ): Readonly<Record<string, readonly Allocation[]>> {
    const grouped: Record<string, Allocation[]> = {};
    for (const a of allocations) {
      if (!grouped[a.warehouseId]) grouped[a.warehouseId] = [];
      grouped[a.warehouseId].push(a);
    }
    return grouped;
  }

  /**
   * Group allocations by vendor.
   */
  static groupByVendor(
    allocations: readonly Allocation[],
  ): Readonly<Record<string, readonly Allocation[]>> {
    const grouped: Record<string, Allocation[]> = {};
    for (const a of allocations) {
      const key = a.vendorId ?? 'unassigned';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(a);
    }
    return grouped;
  }
}
