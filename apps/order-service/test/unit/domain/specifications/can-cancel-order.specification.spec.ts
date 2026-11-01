/**
 * CanCancelOrderSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanCancelOrderSpecification } from '@domain/specifications/can-cancel-order.specification.js';
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

describe('CanCancelOrderSpecification', () => {
  const spec = CanCancelOrderSpecification.strict();

  describe('isSatisfiedBy', () => {
    it('true for pending order', () => {
      const order = makeOrder();
      expect(spec.isSatisfiedBy({ order })).toBe(true);
    });

    it('false for cancelled order (terminal)', () => {
      const order = makeOrder();
      order.cancel('reason', 'user', NOW);
      expect(spec.isSatisfiedBy({ order })).toBe(false);
    });

    it('false for shipped order (ALLOW_AFTER_SHIPMENT false)', () => {
      const order = makeOrder();
      order.confirm('admin', NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, NOW);
      expect(spec.isSatisfiedBy({ order })).toBe(false);
    });

    it('true within cancel window', () => {
      const order = makeOrder();
      expect(
        spec.isSatisfiedBy({
          order,
          ctx: { requestedAt: '2024-01-01T11:00:00.000Z' },
        }),
      ).toBe(true);
    });

    it('false outside cancel window (24h)', () => {
      const order = makeOrder();
      expect(
        spec.isSatisfiedBy({
          order,
          ctx: { requestedAt: '2024-01-03T10:00:00.000Z' },
        }),
      ).toBe(false);
    });
  });

  describe('explain', () => {
    it('returns null for cancellable', () => {
      const order = makeOrder();
      expect(spec.explain({ order })).toBeNull();
    });

    it('returns reason for terminal', () => {
      const order = makeOrder();
      order.cancel('reason', 'user', NOW);
      const reason = spec.explain({ order });
      expect(reason).toContain('terminal');
    });

    it('returns reason for expired window', () => {
      const order = makeOrder();
      const reason = spec.explain({
        order,
        ctx: { requestedAt: '2024-01-05T10:00:00.000Z' },
      });
      expect(reason).toContain('expired');
    });
  });
});
