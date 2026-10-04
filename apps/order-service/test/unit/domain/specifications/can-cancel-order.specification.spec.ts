import { CanCancelOrderSpecification } from '../../../../src/module/domain/specifications/can-cancel-order.specification.js';
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

const NOW = '2026-01-01T10:00:00Z';
const NOW_DATE = new Date(NOW);

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

describe('CanCancelOrderSpecification', () => {
  const spec = new CanCancelOrderSpecification();

  it('pending → satisfied', () => {
    expect(spec.isSatisfiedBy({ order: makeOrder(), ctx: { now: NOW_DATE } })).toBe(true);
  });

  it('shipped → not satisfied for customer', () => {
    const order = makeOrder();
    order.confirm(undefined, NOW);
    order.startProcessing(NOW);
    order.pack(NOW);
    order.ship(undefined, undefined, NOW);
    const result = spec.isSatisfiedBy({ order, ctx: { now: NOW_DATE, actor: 'customer' } });
    expect(result).toBe(false);
  });

  it('shipped → satisfied for admin (allowAfterShipment default false, admin bypass)', () => {
    const order = makeOrder();
    order.confirm(undefined, NOW);
    order.startProcessing(NOW);
    order.pack(NOW);
    order.ship(undefined, undefined, NOW);
    // default ORDER_CANCEL.ALLOW_AFTER_SHIPMENT = false, actor='admin' allowed
    const result = spec.isSatisfiedBy({ order, ctx: { now: NOW_DATE, actor: 'admin', allowAfterShipment: true } });
    expect(result).toBe(true);
  });

  it('out for delivery → false', () => {
    const order = makeOrder();
    order.confirm(undefined, NOW);
    order.startProcessing(NOW);
    order.pack(NOW);
    order.ship(undefined, undefined, NOW);
    order.markOutForDelivery(NOW);
    const result = spec.isSatisfiedBy({ order, ctx: { now: NOW_DATE } });
    expect(result).toBe(false);
  });

  it('outside window → not satisfied for customer', () => {
    const order = makeOrder();
    const later = new Date(Date.parse(NOW) + 48 * 60 * 60 * 1000);
    const result = spec.isSatisfiedBy({ order, ctx: { now: later } });
    expect(result).toBe(false);
  });

  it('remainingMs()', () => {
    const order = makeOrder();
    const remaining = CanCancelOrderSpecification.remainingMs(order, NOW_DATE);
    expect(remaining).toBeGreaterThan(0);
  });

  it('CANCELLABLE_STATUSES', () => {
    expect(CanCancelOrderSpecification.CANCELLABLE_STATUSES).toContain('pending');
    expect(CanCancelOrderSpecification.CANCELLABLE_STATUSES).toContain('confirmed');
  });
});
