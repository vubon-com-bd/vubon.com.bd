import { OrderItemVO } from '../../../../../src/module/domain/value-objects/composites/order-item.vo.js';
import { OrderItemIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';

const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';

function makeVO(qty = 2, price = 100, discount = 0): OrderItemVO {
  return OrderItemVO.create({
    id: OrderItemIdVO.create(UUID_ITEM),
    productId: ProductIdVO.create(UUID_PRODUCT),
    sku: 'SKU-001',
    name: 'Test',
    type: 'product',
    status: OrderItemStatusVO.pending(),
    quantity: OrderItemQuantityVO.create(qty),
    price: OrderItemPriceVO.create(price, 'BDT'),
    discountAmount: discount,
    taxAmount: 0,
    shippingAmount: 0,
  });
}

describe('OrderItemVO', () => {
  it('create()', () => {
    const vo = makeVO();
    expect(vo.quantity.value).toBe(2);
    expect(vo.lineSubtotal).toBe(200);
  });

  it('lineTotal = subtotal - discount + tax + shipping', () => {
    const vo = makeVO(2, 100, 20);
    expect(vo.lineTotal).toBe(180);
  });

  it('throws on empty SKU', () => {
    expect(() =>
      OrderItemVO.create({
        id: OrderItemIdVO.create(UUID_ITEM),
        productId: ProductIdVO.create(UUID_PRODUCT),
        sku: '',
        name: 'Test',
        type: 'product',
        status: OrderItemStatusVO.pending(),
        quantity: OrderItemQuantityVO.create(1),
        price: OrderItemPriceVO.create(100, 'BDT'),
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
      }),
    ).toThrow();
  });

  it('throws when discount > subtotal', () => {
    expect(() => makeVO(1, 100, 500)).toThrow();
  });

  it('isRefundable()', () => {
    const vo = makeVO();
    expect(typeof vo.isRefundable()).toBe('boolean');
  });

  it('hasDiscount()', () => {
    expect(makeVO().hasDiscount()).toBe(false);
    expect(makeVO(2, 100, 10).hasDiscount()).toBe(true);
  });
});
