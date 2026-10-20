/**
 * FulfillmentAllocationService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { FulfillmentAllocationService } from '@domain/services/fulfillment-allocation.service.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  fixtureOrderId,
  fixtureOrderItemId,
  fixtureProductId,
} from '@fixtures/domain/primitive-fixtures.js';

function makeItem(quantity: number = 3): OrderItemVO {
  return OrderItemVO.create({
    id: fixtureOrderItemId,
    orderId: fixtureOrderId,
    productId: fixtureProductId,
    name: 'Test',
    sku: 'SKU-001',
    quantity: OrderItemQuantityVO.create(quantity),
    unitPrice: OrderItemPriceVO.create(100, 'BDT'),
    status: OrderItemStatusVO.pending(),
  });
}

describe('FulfillmentAllocationService', () => {
  describe('allocate', () => {
    it('fully allocates when stock sufficient', () => {
      const items = [makeItem(3)];
      const stock = [{ warehouseId: 'wh-1', itemId: items[0].id.value, available: 10 }];
      const result = FulfillmentAllocationService.allocate(items, stock);
      expect(result.fullyAllocated).toBe(true);
      expect(result.allocations.length).toBe(1);
      expect(result.allocations[0].allocated).toBe(3);
    });

    it('partially allocates when stock insufficient', () => {
      const items = [makeItem(5)];
      const stock = [{ warehouseId: 'wh-1', itemId: items[0].id.value, available: 3 }];
      const result = FulfillmentAllocationService.allocate(items, stock);
      expect(result.fullyAllocated).toBe(false);
      expect(result.allocations[0].allocated).toBe(3);
      expect(result.unallocated[0].requested).toBe(5);
    });

    it('allocates across multiple warehouses', () => {
      const items = [makeItem(10)];
      const stock = [
        { warehouseId: 'wh-1', itemId: items[0].id.value, available: 6 },
        { warehouseId: 'wh-2', itemId: items[0].id.value, available: 4 },
      ];
      const result = FulfillmentAllocationService.allocate(items, stock);
      expect(result.fullyAllocated).toBe(true);
      expect(result.allocations.length).toBe(2);
    });

    it('records vendorId when present', () => {
      const items = [makeItem(2)];
      const stock = [
        { warehouseId: 'wh-1', vendorId: 'v-1', itemId: items[0].id.value, available: 5 },
      ];
      const result = FulfillmentAllocationService.allocate(items, stock);
      expect(result.allocations[0].vendorId).toBe('v-1');
    });

    it('throws for empty items', () => {
      expect(() => FulfillmentAllocationService.allocate([], [])).toThrow(BusinessRuleError);
    });

    it('marks unallocated when no stock', () => {
      const items = [makeItem(3)];
      const result = FulfillmentAllocationService.allocate(items, []);
      expect(result.fullyAllocated).toBe(false);
      expect(result.unallocated.length).toBe(1);
    });
  });

  describe('groupByWarehouse', () => {
    it('groups allocations by warehouse', () => {
      const allocations = [
        { warehouseId: 'wh-1', itemId: 'i-1', allocated: 2 },
        { warehouseId: 'wh-1', itemId: 'i-2', allocated: 1 },
        { warehouseId: 'wh-2', itemId: 'i-3', allocated: 3 },
      ];
      const grouped = FulfillmentAllocationService.groupByWarehouse(allocations);
      expect(grouped['wh-1'].length).toBe(2);
      expect(grouped['wh-2'].length).toBe(1);
    });
  });

  describe('groupByVendor', () => {
    it('groups allocations by vendor', () => {
      const allocations = [
        { warehouseId: 'wh-1', vendorId: 'v-1', itemId: 'i-1', allocated: 2 },
        { warehouseId: 'wh-2', vendorId: 'v-2', itemId: 'i-2', allocated: 1 },
        { warehouseId: 'wh-3', vendorId: 'v-1', itemId: 'i-3', allocated: 3 },
      ];
      const grouped = FulfillmentAllocationService.groupByVendor(allocations);
      expect(grouped['v-1'].length).toBe(2);
      expect(grouped['v-2'].length).toBe(1);
    });

    it('handles missing vendorId as "unassigned"', () => {
      const allocations = [{ warehouseId: 'wh-1', itemId: 'i-1', allocated: 2 }];
      const grouped = FulfillmentAllocationService.groupByVendor(allocations);
      expect(grouped['unassigned'].length).toBe(1);
    });
  });
});
