import { OrderReturnPolicyService } from '../../../../src/module/domain/services/order-return-policy.service.js';
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
import { ORDER_RETURN } from '@vubon/shared-constants/business/order';

const NOW = '2026-01-01T10:00:00Z';
const LATER = new Date(Date.parse(NOW) + 1000);

function makeDeliveredOrder(): OrderEntity {
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
  order.confirm(PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
  order.updatePayment('card', 'completed', PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
  order.startProcessing(NOW);
  order.pack(NOW);
  order.ship(undefined, undefined, NOW);
  order.markOutForDelivery(NOW);
  order.deliver(undefined, NOW);
  // mark items as delivered
  return order;
}

describe('OrderReturnPolicyService', () => {
  describe('evaluate()', () => {
    it('pending order → not allowed', () => {
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
      const result = OrderReturnPolicyService.evaluate(order, LATER);
      expect(result.allowed).toBe(false);
      expect(result.returnableItemIds.length).toBe(0);
    });
  });

  describe('constants', () => {
    it('MAX_IMAGES matches ORDER_RETURN', () => {
      expect(OrderReturnPolicyService.MAX_IMAGES).toBe(ORDER_RETURN.MAX_IMAGES);
    });
    it('MAX_REASON_LENGTH matches ORDER_RETURN', () => {
      expect(OrderReturnPolicyService.MAX_REASON_LENGTH).toBe(ORDER_RETURN.MAX_REASON_LENGTH);
    });
  });

  describe('calculateRestockFee()', () => {
    it('0 when free return', () => {
      const fee = OrderReturnPolicyService.calculateRestockFee(1000);
      expect(fee).toBe(0); // RESTOCK_FEE_PERCENT is 0 in constants
    });
  });

  describe('calculateRefundAmount()', () => {
    it('sums line totals for given items', () => {
      const order = makeDeliveredOrder();
      const itemId = order.items[0].id;
      const amount = OrderReturnPolicyService.calculateRefundAmount(order, [itemId]);
      expect(amount).toBe(100);
    });

    it('0 for empty itemIds', () => {
      const order = makeDeliveredOrder();
      expect(OrderReturnPolicyService.calculateRefundAmount(order, [])).toBe(0);
    });
  });

  describe('RETURNABLE_STATUSES', () => {
    it('includes delivered + completed', () => {
      expect(OrderReturnPolicyService.RETURNABLE_STATUSES).toContain('delivered');
      expect(OrderReturnPolicyService.RETURNABLE_STATUSES).toContain('completed');
    });
  });
});
