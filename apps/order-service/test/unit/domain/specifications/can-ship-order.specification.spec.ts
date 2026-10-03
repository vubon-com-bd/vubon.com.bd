import { CanShipOrderSpecification } from '../../../../src/module/domain/specifications/can-ship-order.specification.js';
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

function makeOrder(): OrderEntity {
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
      subtotal: 100,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 100,
    },
  });
}

describe('CanShipOrderSpecification', () => {
  const spec = new CanShipOrderSpecification();

  it('pending order → not satisfied', () => {
    expect(spec.isSatisfiedBy({ order: makeOrder() })).toBe(false);
  });

  it('packed + paid → satisfied', () => {
    const order = makeOrder();
    order.confirm(PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
    order.updatePayment('card', 'completed', PaymentIdVO.create('55555555-5555-4555-8555-555555555555'), NOW);
    order.startProcessing(NOW);
    order.pack(NOW);
    expect(spec.isSatisfiedBy({ order })).toBe(true);
  });

  it('packed + unpaid → not satisfied', () => {
    const order = makeOrder();
    order.confirm(undefined, NOW);
    order.startProcessing(NOW);
    order.pack(NOW);
    expect(spec.isSatisfiedBy({ order })).toBe(false);
  });

  it('already shipped → not satisfied', () => {
    const order = makeOrder();
    order.confirm(undefined, NOW);
    order.startProcessing(NOW);
    order.pack(NOW);
    order.ship(undefined, undefined, NOW);
    expect(spec.isSatisfiedBy({ order })).toBe(false);
  });

  it('explain() reason', () => {
    const order = makeOrder();
    const reason = spec.explain({ order });
    expect(reason).toBeTruthy();
  });

  it('SHIPPABLE_STATUSES', () => {
    expect(CanShipOrderSpecification.SHIPPABLE_STATUSES).toContain('packed');
    expect(CanShipOrderSpecification.SHIPPABLE_STATUSES).toContain('processing');
  });
});
