import { FulfillmentAllocationService } from '../../../../src/module/domain/services/fulfillment-allocation.service.js';
import { OrderEntity } from '../../../../src/module/domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { OrderNumberVO } from '../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../src/module/domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../src/module/domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VendorIdVO } from '../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';
const UUID_VENDOR_A = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const UUID_VENDOR_B = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

function makeItem(id: string, vendorId?: string): OrderItemEntity {
  return OrderItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: ProductIdVO.create(UUID_PRODUCT),
      vendorId: vendorId ? VendorIdVO.create(vendorId) : undefined,
      sku: 'SKU-001',
      name: 'Test',
      type: 'product',
      status: OrderItemStatusVO.pending(),
      quantity: OrderItemQuantityVO.create(1),
      price: OrderItemPriceVO.create(100, 'BDT'),
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 10,
    },
  });
}

function makeOrder(items: OrderItemEntity[]): OrderEntity {
  const subtotal = items.reduce((s, i) => s + i.lineSubtotal, 0);
  return OrderEntity.create({
    id: '11111111-1111-4111-8111-111111111111',
    now: NOW,
    items,
    props: {
      orderNumber: OrderNumberVO.generate(1, 2026),
      customerId: CustomerIdVO.create('22222222-2222-4222-8222-222222222222'),
      vendorIds: [],
      type: OrderTypeVO.regular(),
      status: OrderStatusVO.pending(),
      priority: OrderPriorityVO.normal(),
      currency: 'BDT',
      subtotal,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: subtotal,
    },
  });
}

describe('FulfillmentAllocationService', () => {
  describe('allocate()', () => {
    it('single vendor → 1 fulfillment', () => {
      const order = makeOrder([makeItem('44444444-4444-4444-8444-444444444444', UUID_VENDOR_A)]);
      const result = FulfillmentAllocationService.allocate(order);
      expect(result.totalFulfillments).toBe(1);
      expect(result.allocations[0].vendorId).toBe(UUID_VENDOR_A);
    });

    it('multi-vendor → one fulfillment per vendor', () => {
      const order = makeOrder([
        makeItem('44444444-4444-4444-8444-444444444444', UUID_VENDOR_A),
        makeItem('55555555-5555-4555-8555-555555555555', UUID_VENDOR_B),
      ]);
      const result = FulfillmentAllocationService.allocate(order);
      expect(result.totalFulfillments).toBe(2);
      const vendors = result.allocations.map((a) => a.vendorId).sort();
      expect(vendors).toEqual([UUID_VENDOR_A, UUID_VENDOR_B].sort());
    });

    it('items without vendor grouped under no vendor', () => {
      const order = makeOrder([makeItem('44444444-4444-4444-8444-444444444444')]);
      const result = FulfillmentAllocationService.allocate(order);
      expect(result.allocations[0].vendorId).toBeUndefined();
    });

    it('estimates cost per fulfillment', () => {
      const order = makeOrder([
        makeItem('44444444-4444-4444-8444-444444444444', UUID_VENDOR_A),
        makeItem('55555555-5555-4555-8555-555555555555', UUID_VENDOR_A),
      ]);
      const result = FulfillmentAllocationService.allocate(order);
      expect(result.allocations[0].estimatedCost).toBe(20); // 10 + 10
    });
  });

  describe('groupByVendor()', () => {
    it('sorts vendors deterministically', () => {
      const items = [
        makeItem('44444444-4444-4444-8444-444444444444', UUID_VENDOR_B),
        makeItem('55555555-5555-4555-8555-555555555555', UUID_VENDOR_A),
      ];
      const grouped = FulfillmentAllocationService.groupByVendor(items);
      const keys = [...grouped.keys()];
      expect(keys[0]).toBe(UUID_VENDOR_A); // A before B
    });
  });

  describe('chunkItems()', () => {
    it('splits into chunks', () => {
      const items = [
        makeItem('11111111-1111-4111-8111-111111111111'),
        makeItem('22222222-2222-4222-8222-222222222222'),
        makeItem('33333333-3333-4333-8333-333333333333'),
      ];
      const chunks = FulfillmentAllocationService.chunkItems(items, 2);
      expect(chunks).toHaveLength(2);
      expect(chunks[0]).toHaveLength(2);
      expect(chunks[1]).toHaveLength(1);
    });
  });

  describe('getEligibleItems()', () => {
    it('excludes cancelled/returned/refunded', () => {
      const order = makeOrder([
        makeItem('44444444-4444-4444-8444-444444444444'),
      ]);
      const eligible = FulfillmentAllocationService.getEligibleItems(order);
      expect(eligible).toHaveLength(1);
    });
  });

  describe('canFullyAllocate()', () => {
    it('true when items exist', () => {
      const order = makeOrder([makeItem('44444444-4444-4444-8444-444444444444')]);
      expect(FulfillmentAllocationService.canFullyAllocate(order)).toBe(true);
    });
  });

  describe('allocationProgress()', () => {
    it('0% with no fulfilled', () => {
      const order = makeOrder([makeItem('44444444-4444-4444-8444-444444444444')]);
      expect(FulfillmentAllocationService.allocationProgress(order, [])).toBe(0);
    });

    it('100% with all fulfilled', () => {
      const order = makeOrder([makeItem('44444444-4444-4444-8444-444444444444')]);
      expect(
        FulfillmentAllocationService.allocationProgress(order, ['44444444-4444-4444-8444-444444444444']),
      ).toBe(100);
    });
  });
});
