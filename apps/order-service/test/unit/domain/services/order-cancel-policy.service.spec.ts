import { OrderCancelPolicyService } from '../../../../src/module/domain/services/order-cancel-policy.service.js';
import { OrderEntity } from '../../../../src/module/domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { OrderNumberVO } from '../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../src/module/domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../src/module/domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { ORDER_CANCEL } from '@vubon/shared-constants/business/order';

const NOW = '2026-01-01T10:00:00Z';
const NOW_DATE = new Date(NOW);

function makeOrder(paid = false): OrderEntity {
  const item = OrderItemEntity.create({
    id: '44444444-4444-4444-8444-444444444444',
    now: NOW,
    props: {
      productId: ProductIdVO.create('33333333-3333-4333-8333-333333333333'),
      sku: 'SKU-001',
      name: 'Test',
      type: 'product',
      status: OrderItemStatusVO.pending(),
      quantity: OrderItemQuantityVO.create(1),
      price: OrderItemPriceVO.create(100, 'BDT'),
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
    },
  });
  const order = OrderEntity.create({
    id: '11111111-1111-4111-8111-111111111111',
    now: NOW,
    items: [item],
    props: {
      orderNumber: OrderNumberVO.generate(1, 2026),
      customerId: CustomerIdVO.create('22222222-2222-4222-8222-222222222222'),
      vendorIds: [],
      type: OrderTypeVO.regular(),
      status: OrderStatusVO.pending(),
      priority: OrderPriorityVO.normal(),
      currency: 'BDT',
      subtotal: 100,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 100,
    },
  });
  if (paid) {
    order.confirm(PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
    order.updatePayment('card', 'completed', PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
  }
  return order;
}

describe('OrderCancelPolicyService', () => {
  describe('evaluate()', () => {
    it('pending order → allowed', () => {
      const order = makeOrder();
      const result = OrderCancelPolicyService.evaluate(order, NOW_DATE);
      expect(result.allowed).toBe(true);
      expect(result.autoApprove).toBe(true);
      expect(result.restockInventory).toBe(true);
      expect(result.requiresRefund).toBe(false);
    });

    it('paid order → requiresRefund true', () => {
      const order = makeOrder(true);
      const result = OrderCancelPolicyService.evaluate(order, NOW_DATE);
      expect(result.allowed).toBe(true);
      expect(result.requiresRefund).toBe(true);
    });

    it('delivered order → not allowed (final)', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      order.markOutForDelivery(NOW);
      order.deliver(undefined, NOW);
      const result = OrderCancelPolicyService.evaluate(order, NOW_DATE);
      expect(result.allowed).toBe(false);
      expect(result.reason).toMatch(/final/i);
    });

    it('shipped order → not allowed (shipped)', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      const result = OrderCancelPolicyService.evaluate(order, NOW_DATE);
      expect(result.allowed).toBe(false);
      expect(result.reason).toMatch(/ship/i);
    });

    it('outside cancel window → not allowed', () => {
      const order = makeOrder();
      // window is 24h; simulate 48h later
      const later = new Date(Date.parse(NOW) + 48 * 60 * 60 * 1000);
      const result = OrderCancelPolicyService.evaluate(order, later);
      expect(result.allowed).toBe(false);
      expect(result.reason).toMatch(/window/i);
    });
  });

  describe('isWithinWindow()', () => {
    it('within 24h → true', () => {
      const order = makeOrder();
      const t = new Date(Date.parse(NOW) + 2 * 60 * 60 * 1000);
      expect(OrderCancelPolicyService.isWithinWindow(order, t)).toBe(true);
    });
    it('after 24h → false', () => {
      const order = makeOrder();
      const t = new Date(Date.parse(NOW) + 25 * 60 * 60 * 1000);
      expect(OrderCancelPolicyService.isWithinWindow(order, t)).toBe(false);
    });
  });

  describe('remainingWindowMs()', () => {
    it('returns remaining ms', () => {
      const order = makeOrder();
      const remaining = OrderCancelPolicyService.remainingWindowMs(order, NOW_DATE);
      const expected = ORDER_CANCEL.WINDOW_HOURS * 60 * 60 * 1000;
      expect(remaining).toBeCloseTo(expected, -3);
    });

    it('0 when expired', () => {
      const order = makeOrder();
      const later = new Date(Date.parse(NOW) + 100 * 60 * 60 * 1000);
      expect(OrderCancelPolicyService.remainingWindowMs(order, later)).toBe(0);
    });
  });

  describe('calculateRefund()', () => {
    it('returns 0 when not paid', () => {
      const order = makeOrder(false);
      expect(OrderCancelPolicyService.calculateRefund(order)).toBe(0);
    });

    it('returns total when paid', () => {
      const order = makeOrder(true);
      expect(OrderCancelPolicyService.calculateRefund(order)).toBe(100);
    });
  });

  describe('canCustomerCancel()', () => {
    it('pending → true', () => {
      const order = makeOrder();
      expect(OrderCancelPolicyService.canCustomerCancel(order, NOW_DATE)).toBe(true);
    });

    it('shipped → false', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      expect(OrderCancelPolicyService.canCustomerCancel(order, NOW_DATE)).toBe(false);
    });
  });
});
