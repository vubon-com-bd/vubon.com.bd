/**
 * OrderSnapshotService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderSnapshotService } from '@domain/services/order-snapshot.service.js';
import { OrderEntity } from '@domain/entities/order.entity.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import {
  fixtureOrderVO,
  fixtureShippingAddressVO,
  fixtureBillingAddressVO,
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
    name: 'Test Product',
    sku: 'SKU-001',
    quantity: OrderItemQuantityVO.create(2),
    unitPrice: OrderItemPriceVO.create(500, 'BDT'),
    status: OrderItemStatusVO.pending(),
  });
}

function makeOrder(): OrderEntity {
  return OrderEntity.create({
    id: fixtureOrderId.value,
    vo: fixtureOrderVO,
    items: [makeItem()],
    shippingAddress: fixtureShippingAddressVO,
    billingAddress: fixtureBillingAddressVO,
    now: NOW,
  });
}

describe('OrderSnapshotService', () => {
  describe('capture', () => {
    it('creates snapshot with full data', () => {
      const order = makeOrder();
      const snapshot = OrderSnapshotService.capture(order);
      expect(snapshot.order.id.value).toBe(fixtureOrderId.value);
      expect(snapshot.items.length).toBe(1);
      expect(snapshot.snapshotAt).toBeDefined();
    });

    it('includes billing address by default', () => {
      const order = makeOrder();
      const snapshot = OrderSnapshotService.capture(order);
      expect(snapshot.hasBillingAddress()).toBe(true);
    });

    it('excludes billing address when includeBillingAddress=false', () => {
      const order = makeOrder();
      const snapshot = OrderSnapshotService.capture(order, {
        includeBillingAddress: false,
      });
      expect(snapshot.hasBillingAddress()).toBe(false);
    });

    it('uses custom now', () => {
      const order = makeOrder();
      const customNow = '2024-06-15T12:00:00.000Z';
      const snapshot = OrderSnapshotService.capture(order, { now: customNow });
      expect(snapshot.snapshotAt).toBe(customNow);
    });
  });

  describe('toJSON', () => {
    it('serializes to plain JSON', () => {
      const order = makeOrder();
      const snapshot = OrderSnapshotService.capture(order);
      const json = OrderSnapshotService.toJSON(snapshot);
      expect(json.order).toBeDefined();
      expect(json.items).toBeDefined();
      expect(json.shippingAddress).toBeDefined();
      expect(json.snapshotAt).toBeDefined();
    });

    it('serialized order has required fields', () => {
      const order = makeOrder();
      const snapshot = OrderSnapshotService.capture(order);
      const json = OrderSnapshotService.toJSON(snapshot) as {
        order: Record<string, unknown>;
      };
      expect(json.order.id).toBe(fixtureOrderId.value);
      expect(json.order.orderNumber).toBeDefined();
      expect(json.order.status).toBeDefined();
    });
  });

  describe('isEquivalent', () => {
    it('true for same snapshot data', () => {
      const order = makeOrder();
      const a = OrderSnapshotService.capture(order, { now: NOW });
      const b = OrderSnapshotService.capture(order, { now: NOW });
      expect(OrderSnapshotService.isEquivalent(a, b)).toBe(true);
    });

    it('false for different snapshot times', () => {
      const order = makeOrder();
      const a = OrderSnapshotService.capture(order, { now: NOW });
      const b = OrderSnapshotService.capture(order, {
        now: '2024-06-15T12:00:00.000Z',
      });
      expect(OrderSnapshotService.isEquivalent(a, b)).toBe(false);
    });
  });
});
