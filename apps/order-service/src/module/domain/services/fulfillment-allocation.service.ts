/**
 * FulfillmentAllocationService — allocate order items to fulfillments
 * @module order-service/domain/services
 *
 * Strategy: group items by vendor, then create one fulfillment per vendor.
 */
import { ORDER_FULFILLMENT } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';
import type { OrderItemEntity } from '../entities/order-item.entity.js';

export interface FulfillmentAllocation {
  readonly vendorId?: string;
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly estimatedCost: number;
}

export interface AllocationResult {
  readonly allocations: readonly FulfillmentAllocation[];
  readonly totalFulfillments: number;
  readonly totalItems: number;
  readonly hasUnallocated: boolean;
}

export class FulfillmentAllocationService {
  /**
   * Allocate order items to fulfillments grouped by vendor.
   * Items are sorted by vendorId for deterministic output.
   */
  static allocate(order: OrderEntity): AllocationResult {
    const eligibleItems = this.getEligibleItems(order);
    const grouped = this.groupByVendor(eligibleItems);

    const allocations: FulfillmentAllocation[] = [];
    for (const [vendorId, items] of grouped) {
      // Split into chunks if exceeding MAX_ITEMS_PER_SHIPMENT
      const chunks = this.chunkItems(items, ORDER_FULFILLMENT.MAX_ITEMS_PER_SHIPMENT);
      for (const chunk of chunks) {
        allocations.push({
          vendorId: vendorId === '__none__' ? undefined : vendorId,
          itemIds: chunk.map((i) => i.id),
          itemCount: chunk.reduce((sum, i) => sum + i.quantity.value, 0),
          estimatedCost: this.estimateCost(chunk),
        });
      }
    }

    const allocatedIds = new Set(allocations.flatMap((a) => a.itemIds));
    const hasUnallocated = eligibleItems.some((i) => !allocatedIds.has(i.id));

    return {
      allocations,
      totalFulfillments: allocations.length,
      totalItems: eligibleItems.reduce((sum, i) => sum + i.quantity.value, 0),
      hasUnallocated,
    };
  }

  /** Get items that are eligible for fulfillment. */
  static getEligibleItems(order: OrderEntity): readonly OrderItemEntity[] {
    return order.items.filter(
      (item) => !item.isCancelled() && !item.isReturned() && !item.isRefunded(),
    );
  }

  /** Group items by vendorId. Items without vendor use '__none__' key. */
  static groupByVendor(
    items: readonly OrderItemEntity[],
  ): Map<string, OrderItemEntity[]> {
    const map = new Map<string, OrderItemEntity[]>();
    for (const item of items) {
      const key = item.vendorId?.value ?? '__none__';
      const bucket = map.get(key) ?? [];
      bucket.push(item);
      map.set(key, bucket);
    }
    // Deterministic ordering
    return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
  }

  /** Split items into chunks of at most `size`. */
  static chunkItems(
    items: readonly OrderItemEntity[],
    size: number,
  ): OrderItemEntity[][] {
    const chunks: OrderItemEntity[][] = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  }

  /** Rough cost estimate: sum of item shipping amounts. */
  static estimateCost(items: readonly OrderItemEntity[]): number {
    const total = items.reduce((sum, i) => sum + i.shippingAmount, 0);
    return Math.round(total * 100) / 100;
  }

  /** Check if order can be fully allocated. */
  static canFullyAllocate(order: OrderEntity): boolean {
    return order.items.length > 0 && this.getEligibleItems(order).length > 0;
  }

  /** Compute progress percentage (0–100). */
  static allocationProgress(
    order: OrderEntity,
    fulfilledItemIds: readonly string[],
  ): number {
    const total = order.items.length;
    if (total === 0) return 0;
    const fulfilled = order.items.filter((i) => fulfilledItemIds.includes(i.id)).length;
    return Math.round((fulfilled / total) * 100);
  }
}
