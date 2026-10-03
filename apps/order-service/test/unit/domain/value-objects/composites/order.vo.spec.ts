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
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';

function makeItemVO(): OrderItemVO {
  return OrderItemVO.create({
    id: OrderItemIdVO.create(UUID_ITEM),
    productId: ProductIdVO.create(UUID_PRODUCT),
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
}

describe('OrderVO', () => {
  it('create() with valid props', () => {
    const vo = OrderVO.create({
      id: OrderIdVO.create(UUID_ORDER),
      orderNumber: OrderNumberVO.generate(1, 2026),
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      vendorIds: [],
      type: OrderTypeVO.regular(),
      status: OrderStatusVO.pending(),
      priority: OrderPriorityVO.normal(),
      items: [makeItemVO()],
      subtotal: 100,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 100,
      currency: 'BDT',
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.id.value).toBe(UUID_ORDER);
    expect(vo.itemCount).toBe(1);
    expect(vo.total).toBe(100);
  });

  it('throws on empty items', () => {
    expect(() =>
      OrderVO.create({
        id: OrderIdVO.create(UUID_ORDER),
        orderNumber: OrderNumberVO.generate(1, 2026),
        customerId: CustomerIdVO.create(UUID_CUSTOMER),
        vendorIds: [],
        type: OrderTypeVO.regular(),
        status: OrderStatusVO.pending(),
        priority: OrderPriorityVO.normal(),
        items: [],
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 0,
        currency: 'BDT',
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow();
  });

  it('throws on total mismatch', () => {
    expect(() =>
      OrderVO.create({
        id: OrderIdVO.create(UUID_ORDER),
        orderNumber: OrderNumberVO.generate(1, 2026),
        customerId: CustomerIdVO.create(UUID_CUSTOMER),
        vendorIds: [],
        type: OrderTypeVO.regular(),
        status: OrderStatusVO.pending(),
        priority: OrderPriorityVO.normal(),
        items: [makeItemVO()],
        subtotal: 100,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 999, // wrong
        currency: 'BDT',
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow();
  });
});
