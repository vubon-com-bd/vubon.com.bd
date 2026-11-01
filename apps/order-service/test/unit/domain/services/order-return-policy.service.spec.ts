/**
 * OrderReturnPolicyService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderReturnPolicyService } from '@domain/services/order-return-policy.service.js';
import { OrderEntity } from '@domain/entities/order.entity.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
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
const DELIVERED_AT = '2024-01-02T10:00:00.000Z';

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

function makeDeliveredOrder(): OrderEntity {
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
  order.markDelivered('customer', DELIVERED_AT);
  return order;
}

describe('OrderReturnPolicyService', () => {
  describe('checkEligibility', () => {
    it('eligible for delivered order within window', () => {
      const order = makeDeliveredOrder();
      const result = OrderReturnPolicyService.checkEligibility(order, {
        now: '2024-01-03T10:00:00.000Z', // 1 day after delivery
      });
      expect(result.eligible).toBe(true);
      expect(result.refundAmount).toBe(1000);
    });

    it('not eligible for pending order', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      const result = OrderReturnPolicyService.checkEligibility(order);
      expect(result.eligible).toBe(false);
      expect(result.reason).toContain('not returnable');
    });

    it('not eligible after max return window', () => {
      const order = makeDeliveredOrder();
      const result = OrderReturnPolicyService.checkEligibility(order, {
        now: '2024-03-15T10:00:00.000Z', // 73 days later
      });
      expect(result.eligible).toBe(false);
      expect(result.reason).toContain('expired');
    });
  });

  describe('assertEligible', () => {
    it('passes for delivered order', () => {
      const order = makeDeliveredOrder();
      expect(() =>
        OrderReturnPolicyService.assertEligible(order, {
          now: '2024-01-03T10:00:00.000Z',
        }),
      ).not.toThrow();
    });

    it('throws for non-returnable order', () => {
      const order = OrderEntity.create({
        id: fixtureOrderId.value,
        vo: fixtureOrderVO,
        items: [makeItem()],
        shippingAddress: fixtureShippingAddressVO,
        now: NOW,
      });
      expect(() => OrderReturnPolicyService.assertEligible(order)).toThrow(BusinessRuleError);
    });
  });

  describe('shouldChargeRestockFee', () => {
    it('returns boolean for valid reason', () => {
      const result = OrderReturnPolicyService.shouldChargeRestockFee('changed_mind');
      expect(typeof result).toBe('boolean');
    });

    it('returns false for invalid reason', () => {
      expect(OrderReturnPolicyService.shouldChargeRestockFee('invalid')).toBe(false);
    });
  });

  describe('computeRefundAmount', () => {
    it('full refund when no itemIds', () => {
      const order = makeDeliveredOrder();
      expect(OrderReturnPolicyService.computeRefundAmount(order)).toBe(1000);
    });

    it('partial refund when itemIds specified', () => {
      const order = makeDeliveredOrder();
      const itemId = order.items[0].id.value;
      expect(OrderReturnPolicyService.computeRefundAmount(order, [itemId])).toBe(1000);
    });

    it('throws when no items match', () => {
      const order = makeDeliveredOrder();
      expect(() =>
        OrderReturnPolicyService.computeRefundAmount(order, ['non-existent']),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('computeRestockFee', () => {
    it('returns fee amount', () => {
      const fee = OrderReturnPolicyService.computeRestockFee(1000);
      expect(typeof fee).toBe('number');
      expect(fee).toBeGreaterThanOrEqual(0);
    });
  });
});
