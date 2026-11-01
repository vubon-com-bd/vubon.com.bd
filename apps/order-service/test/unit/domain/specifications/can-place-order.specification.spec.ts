/**
 * CanPlaceOrderSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanPlaceOrderSpecification } from '@domain/specifications/can-place-order.specification.js';
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

function makeOrder(): OrderEntity {
  return OrderEntity.create({
    id: fixtureOrderId.value,
    vo: fixtureOrderVO,
    items: [makeItem()],
    shippingAddress: fixtureShippingAddressVO,
    now: NOW,
  });
}

describe('CanPlaceOrderSpecification', () => {
  const spec = CanPlaceOrderSpecification.strict();

  describe('isSatisfiedBy', () => {
    it('true for pending order with items', () => {
      const order = makeOrder();
      expect(spec.isSatisfiedBy({ order })).toBe(true);
    });

    it('false for non-pending order', () => {
      const order = makeOrder();
      order.confirm('admin', NOW);
      expect(spec.isSatisfiedBy({ order })).toBe(false);
    });

    it('false for blocked customer', () => {
      const order = makeOrder();
      expect(
        spec.isSatisfiedBy({ order, ctx: { customerStatus: 'blocked' } }),
      ).toBe(false);
    });

    it('false for suspended customer', () => {
      const order = makeOrder();
      expect(
        spec.isSatisfiedBy({ order, ctx: { customerStatus: 'suspended' } }),
      ).toBe(false);
    });

    it('true for active customer', () => {
      const order = makeOrder();
      expect(
        spec.isSatisfiedBy({ order, ctx: { customerStatus: 'active' } }),
      ).toBe(true);
    });
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      const order = makeOrder();
      expect(spec.explain({ order })).toBeNull();
    });

    it('returns reason for non-pending', () => {
      const order = makeOrder();
      order.confirm('admin', NOW);
      const reason = spec.explain({ order });
      expect(reason).toContain('not in pending status');
    });

    it('returns reason for blocked customer', () => {
      const order = makeOrder();
      const reason = spec.explain({
        order,
        ctx: { customerStatus: 'blocked' },
      });
      expect(reason).toContain('not eligible');
    });
  });

  describe('composition', () => {
    it('and() works', () => {
      const order = makeOrder();
      const composite = spec.and(spec);
      expect(composite.isSatisfiedBy({ order })).toBe(true);
    });

    it('not() works', () => {
      const order = makeOrder();
      order.confirm('admin', NOW);
      expect(spec.not().isSatisfiedBy({ order })).toBe(true);
    });

    it('or() works', () => {
      const order = makeOrder();
      order.confirm('admin', NOW);
      const composite = spec.or(spec.not());
      expect(composite.isSatisfiedBy({ order })).toBe(true);
    });
  });
});
