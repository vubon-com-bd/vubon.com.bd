/**
 * CanDeliverOrderSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanDeliverOrderSpecification } from '@domain/specifications/can-deliver-order.specification.js';
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

function makeShippedOrder(): OrderEntity {
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
  order.ship(undefined, '2024-01-01T10:45:00.000Z');
  return order;
}

describe('CanDeliverOrderSpecification', () => {
  const spec = CanDeliverOrderSpecification.strict();

  describe('isSatisfiedBy', () => {
    it('true for shipped order', () => {
      const order = makeShippedOrder();
      expect(spec.isSatisfiedBy({ order })).toBe(true);
    });

    it('false for packed (not shipped)', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      order.confirm('admin', NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      expect(spec.isSatisfiedBy({ order })).toBe(false);
    });
  });

  describe('explain', () => {
    it('returns null for shipped', () => {
      const order = makeShippedOrder();
      expect(spec.explain({ order })).toBeNull();
    });

    it('returns reason for non-shipped', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      expect(spec.explain({ order })).toContain('shipped');
    });
  });
});
