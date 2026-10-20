/**
 * CanShipOrderSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanShipOrderSpecification } from '@domain/specifications/can-ship-order.specification.js';
import { OrderEntity } from '@domain/entities/order.entity.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import {
  fixtureOrderVO,
  fixtureShippingAddressVO,
} from '@fixtures/domain/composite-fixtures.js';
import {
  fixtureOrderId,
  fixtureOrderItemId,
  fixtureProductId,
} from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeItem(): OrderItemVO {
  return OrderItemVO.create({
    id: fixtureOrderItemId,
    orderId: fixtureOrderId,
    productId: fixtureProductId,
    name: 'Test',
    sku: 'SKU-001',
    quantity: OrderItemQuantityVO.create(1),
    unitPrice: OrderItemPriceVO.create(1000, 'BDT'),
    status: OrderItemStatusVO.pending(),
  });
}

function makePackedOrder(): OrderEntity {
  const order = OrderEntity.create({
    id: fixtureOrderId.value,
    vo: fixtureOrderVO,
    items: [makeItem()],
    shippingAddress: fixtureShippingAddressVO,
    now: NOW,
  });
  order.confirm('admin', '2024-01-01T10:30:00.000Z');
  order.startProcessing('2024-01-01T10:35:00.000Z');
  order.pack('2024-01-01T10:40:00.000Z');
  return order;
}

describe('CanShipOrderSpecification', () => {
  const spec = CanShipOrderSpecification.strict();

  describe('isSatisfiedBy', () => {
    it('true for packed order', () => {
      const order = makePackedOrder();
      expect(spec.isSatisfiedBy({ order })).toBe(true);
    });

    it('false for pending order (not packed)', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      expect(spec.isSatisfiedBy({ order })).toBe(false);
    });

    it('false for empty courierId', () => {
      const order = makePackedOrder();
      expect(
        spec.isSatisfiedBy({ order, ctx: { courierId: '' } }),
      ).toBe(false);
    });

    it('true with valid courierId', () => {
      const order = makePackedOrder();
      expect(
        spec.isSatisfiedBy({ order, ctx: { courierId: 'courier-1' } }),
      ).toBe(true);
    });
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      const order = makePackedOrder();
      expect(spec.explain({ order })).toBeNull();
    });

    it('returns reason for non-packed', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      expect(spec.explain({ order })).toContain('packed');
    });

    it('returns reason for empty courierId', () => {
      const order = makePackedOrder();
      expect(
        spec.explain({ order, ctx: { courierId: '' } }),
      ).toContain('Courier');
    });
  });
});
