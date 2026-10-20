/**
 * OrderCancelPolicyService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderCancelPolicyService } from '@domain/services/order-cancel-policy.service.js';
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

describe('OrderCancelPolicyService', () => {
  describe('checkEligibility', () => {
    it('eligible for fresh pending order', () => {
      const order = makeOrder();
      const result = OrderCancelPolicyService.checkEligibility(order, {
        now: '2024-01-01T11:00:00.000Z', // 1 hour later
      });
      expect(result.eligible).toBe(true);
      expect(result.refundAmount).toBe(1000);
    });

    it('not eligible after window', () => {
      const order = makeOrder();
      const result = OrderCancelPolicyService.checkEligibility(order, {
        now: '2024-01-03T10:00:00.000Z', // 48 hours later
      });
      expect(result.eligible).toBe(false);
      expect(result.reason).toContain('expired');
    });

    it('not eligible for terminal order', () => {
      const order = makeOrder();
      order.cancel('reason', 'admin', '2024-01-01T10:30:00.000Z');
      const result = OrderCancelPolicyService.checkEligibility(order);
      expect(result.eligible).toBe(false);
    });

    it('not eligible after shipment (if ALLOW_AFTER_SHIPMENT false)', () => {
      const order = makeOrder();
      order.confirm('admin', '2024-01-01T10:30:00.000Z');
      order.startProcessing('2024-01-01T10:35:00.000Z');
      order.pack('2024-01-01T10:40:00.000Z');
      order.ship(undefined, '2024-01-01T10:45:00.000Z');
      const result = OrderCancelPolicyService.checkEligibility(order, {
        now: '2024-01-01T11:00:00.000Z',
      });
      expect(result.eligible).toBe(false);
    });
  });

  describe('assertEligible', () => {
    it('passes for fresh order', () => {
      const order = makeOrder();
      expect(() =>
        OrderCancelPolicyService.assertEligible(order, {
          now: '2024-01-01T11:00:00.000Z',
        }),
      ).not.toThrow();
    });

    it('throws for expired order', () => {
      const order = makeOrder();
      expect(() =>
        OrderCancelPolicyService.assertEligible(order, {
          now: '2024-01-05T10:00:00.000Z',
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('shouldAutoApprove', () => {
    it('returns boolean for system reasons', () => {
      const result = OrderCancelPolicyService.shouldAutoApprove('out_of_stock');
      expect(typeof result).toBe('boolean');
    });

    it('handles invalid reason gracefully', () => {
      expect(OrderCancelPolicyService.shouldAutoApprove('invalid')).toBe(false);
    });
  });

  describe('computeRefundAmount', () => {
    it('returns total amount', () => {
      const order = makeOrder();
      expect(OrderCancelPolicyService.computeRefundAmount(order)).toBe(1000);
    });
  });
});
