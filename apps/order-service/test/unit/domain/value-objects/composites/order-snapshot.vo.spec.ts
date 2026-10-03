import { OrderSnapshotVO } from '../../../../../src/module/domain/value-objects/composites/order-snapshot.vo.js';
import { OrderVO } from '../../../../../src/module/domain/value-objects/composites/order.vo.js';
import { OrderItemVO } from '../../../../../src/module/domain/value-objects/composites/order-item.vo.js';
import { OrderIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderNumberVO } from '../../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../../src/module/domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../../src/module/domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { OrderItemIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';

const NOW = '2026-01-01T10:00:00Z';

function makeOrderVO(): OrderVO {
  const item = OrderItemVO.create({
    id: OrderItemIdVO.create('44444444-4444-4444-8444-444444444444'),
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
  });
  return OrderVO.create({
    id: OrderIdVO.create('11111111-1111-4111-8111-111111111111'),
    orderNumber: OrderNumberVO.generate(1, 2026),
    customerId: CustomerIdVO.create('22222222-2222-4222-8222-222222222222'),
    vendorIds: [],
    type: OrderTypeVO.regular(),
    status: OrderStatusVO.pending(),
    priority: OrderPriorityVO.normal(),
    items: [item],
    subtotal: 100,
    discountAmount: 0,
    taxAmount: 0,
    shippingAmount: 0,
    total: 100,
    currency: 'BDT',
    createdAt: NOW,
    updatedAt: NOW,
  });
}

describe('OrderSnapshotVO', () => {
  it('create()', () => {
    const snap = OrderSnapshotVO.create({
      order: makeOrderVO(),
      version: 3,
      takenAt: NOW,
      reason: 'after_confirm',
      takenBy: 'system',
    });
    expect(snap.version).toBe(3);
    expect(snap.reason).toBe('after_confirm');
  });

  it('throws on empty reason', () => {
    expect(() =>
      OrderSnapshotVO.create({
        order: makeOrderVO(),
        version: 1,
        takenAt: NOW,
        reason: '',
      }),
    ).toThrow();
  });

  it('exposes order fields', () => {
    const snap = OrderSnapshotVO.create({
      order: makeOrderVO(),
      version: 1,
      takenAt: NOW,
      reason: 'r',
    });
    expect(snap.orderId).toBe('11111111-1111-4111-8111-111111111111');
    expect(snap.status).toBe('pending');
    expect(snap.total).toBe(100);
  });
});
