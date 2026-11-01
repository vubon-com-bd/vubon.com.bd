/**
 * CanRefundOrderSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanRefundOrderSpecification } from '@domain/specifications/can-refund-order.specification.js';
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

function makeCancelledOrder(): OrderEntity {
  const order = OrderEntity.create({
    id: fixtureOrderId.value,
    vo: fixtureOrderVO,
    items: [makeItem()],
    shippingAddress: fixtureShippingAddressVO,
    now: NOW,
  });
  order.cancel('reason', 'user', '2024-01-01T10:05:00.000Z');
  return order;
}

describe('CanRefundOrderSpecification', () => {
  const spec = CanRefundOrderSpecification.strict();

  describe('isSatisfiedBy', () => {
    it('true for cancelled order', () => {
      const order = makeCancelledOrder();
      expect(spec.isSatisfiedBy({ order })).toBe(true);
    });

    it('false for pending order', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      expect(spec.isSatisfiedBy({ order })).toBe(false);
    });

    it('true for cancelled with valid amount', () => {
      const order = makeCancelledOrder();
      expect(spec.isSatisfiedBy({ order, ctx: { amount: 1000 } })).toBe(true);
    });

    it('false for negative amount', () => {
      const order = makeCancelledOrder();
      expect(spec.isSatisfiedBy({ order, ctx: { amount: -1 } })).toBe(false);
    });

    it('false for amount > order total', () => {
      const order = makeCancelledOrder();
      expect(spec.isSatisfiedBy({ order, ctx: { amount: 2000 } })).toBe(false);
    });

    it('returns reason for pending', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      expect(spec.explain({ order })).toContain('not eligible');
    });

    it('returns reason for amount > total', () => {
      const order = makeCancelledOrder();
      const reason = spec.explain({ order, ctx: { amount: 2000 } });
      expect(reason).toContain('exceeds');
    });
  });
});
