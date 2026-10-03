import { OrderEligibilityService } from '../../../../src/module/domain/services/order-eligibility.service.js';
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

const NOW = '2026-01-01T10:00:00Z';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';

function makeItem(qty = 1, price = 100): OrderItemEntity {
  return OrderItemEntity.create({
    id: '44444444-4444-4444-8444-444444444444',
    now: NOW,
    props: {
      productId: ProductIdVO.create(UUID_PRODUCT),
      sku: 'SKU-001',
      name: 'Test',
      type: 'product',
      status: OrderItemStatusVO.pending(),
      quantity: OrderItemQuantityVO.create(qty),
      price: OrderItemPriceVO.create(price, 'BDT'),
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
    },
  });
}

function makeOrder(qty = 1, price = 100): OrderEntity {
  const item = makeItem(qty, price);
  const subtotal = item.lineSubtotal;
  return OrderEntity.create({
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
      subtotal,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: subtotal,
    },
  });
}

describe('OrderEligibilityService', () => {
  describe('canPlaceOrder()', () => {
    it('valid order → eligible', () => {
      const order = makeOrder();
      expect(OrderEligibilityService.canPlaceOrder(order).eligible).toBe(true);
    });

    it('zero total → not eligible', () => {
      // create an order with 0 items
      const order = OrderEntity.create({
        id: '11111111-1111-4111-8111-111111111111',
        now: NOW,
        items: [makeItem(1, 0)], // 0 price
        props: {
          orderNumber: OrderNumberVO.generate(1, 2026),
          customerId: CustomerIdVO.create('22222222-2222-4222-8222-222222222222'),
          vendorIds: [],
          type: OrderTypeVO.regular(),
          status: OrderStatusVO.pending(),
          priority: OrderPriorityVO.normal(),
          currency: 'BDT',
          subtotal: 0,
          discountAmount: 0,
          taxAmount: 0,
          shippingAmount: 0,
          total: 0,
        },
      });
      const result = OrderEligibilityService.canPlaceOrder(order);
      expect(result.eligible).toBe(false);
    });
  });

  describe('canModify()', () => {
    it('pending → true', () => {
      const order = makeOrder();
      expect(OrderEligibilityService.canModify(order).eligible).toBe(true);
    });

    it('shipped → false', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      expect(OrderEligibilityService.canModify(order).eligible).toBe(false);
    });
  });

  describe('canPay()', () => {
    it('pending → true', () => {
      const order = makeOrder();
      expect(OrderEligibilityService.canPay(order).eligible).toBe(true);
    });

    it('paid → false', () => {
      const order = makeOrder();
      order.confirm(PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
      order.updatePayment('card', 'completed', PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
      expect(OrderEligibilityService.canPay(order).eligible).toBe(false);
    });

    it('cancelled → false', () => {
      const order = makeOrder();
      order.cancel('reason', undefined, undefined, NOW);
      expect(OrderEligibilityService.canPay(order).eligible).toBe(false);
    });
  });

  describe('canShip()', () => {
    it('packed + paid → true', () => {
      const order = makeOrder();
      order.confirm(PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
      order.updatePayment('card', 'completed', PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      expect(OrderEligibilityService.canShip(order).eligible).toBe(true);
    });

    it('unpaid → false', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      expect(OrderEligibilityService.canShip(order).eligible).toBe(false);
    });
  });

  describe('canDeliver()', () => {
    it('shipped → true', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      expect(OrderEligibilityService.canDeliver(order).eligible).toBe(true);
    });

    it('pending → false', () => {
      const order = makeOrder();
      expect(OrderEligibilityService.canDeliver(order).eligible).toBe(false);
    });
  });

  describe('canCancel()', () => {
    it('pending → true', () => {
      expect(OrderEligibilityService.canCancel(makeOrder()).eligible).toBe(true);
    });
    it('completed → false', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      order.markOutForDelivery(NOW);
      order.deliver(undefined, NOW);
      order.complete(NOW);
      expect(OrderEligibilityService.canCancel(order).eligible).toBe(false);
    });
  });

  describe('isOverLimit() / hasTooManyItems()', () => {
    it('false for normal order', () => {
      const order = makeOrder();
      expect(OrderEligibilityService.isOverLimit(order)).toBe(false);
      expect(OrderEligibilityService.hasTooManyItems(order)).toBe(false);
    });
  });
});
