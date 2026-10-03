import { CanPlaceOrderSpecification } from '../../../../src/module/domain/specifications/can-place-order.specification.js';
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
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';

function makeOrder(qty = 1, price = 100): OrderEntity {
  const item = OrderItemEntity.create({
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

describe('CanPlaceOrderSpecification', () => {
  const spec = new CanPlaceOrderSpecification();

  it('valid order → satisfied', () => {
    expect(spec.isSatisfiedBy({ order: makeOrder() })).toBe(true);
    expect(spec.explain({ order: makeOrder() })).toBeNull();
  });

  it('rejects when amount < minimum', () => {
    const order = makeOrder(1, 0.5);
    expect(spec.isSatisfiedBy({ order, ctx: { minimumAmount: 10 } })).toBe(false);
    expect(spec.explain({ order, ctx: { minimumAmount: 10 } })).toContain('minimum');
  });

  it('rejects when amount > maximum', () => {
    const order = makeOrder(10, 10000);
    expect(spec.isSatisfiedBy({ order, ctx: { maximumAmount: 1000 } })).toBe(false);
  });

  it('rejects on currency mismatch (via ctx.allowedCurrencies)', () => {
    const order = makeOrder();
    expect(
      spec.isSatisfiedBy({ order, ctx: { allowedCurrencies: ['USD'] } }),
    ).toBe(false);
  });

  it('rejects when item count > maxItems', () => {
    const order = makeOrder();
    expect(
      spec.isSatisfiedBy({ order, ctx: { maxItems: 0 } }),
    ).toBe(false);
    expect(spec.explain({ order, ctx: { maxItems: 0 } })).toContain('items');
  });
});
