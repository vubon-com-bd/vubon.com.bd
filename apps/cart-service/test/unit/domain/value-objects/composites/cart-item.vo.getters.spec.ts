import { describe, it, expect } from '@jest/globals';
import { CartItemVO } from '@domain/value-objects/composites/cart-item.vo.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartItemVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartItemVO.create({
      id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
      productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
      quantity: CartItemQuantityVO.create(2),
      status: CartItemStatusVO.active(),
      unitPrice: 100,
      currency: TEST_CURRENCY,
      addedAt: TEST_DATES.NOW,
    });

    expect(vo.id.value).toBe(TEST_IDS.CART_ITEM_ID);
    expect(vo.productId.value).toBe(TEST_IDS.PRODUCT_ID);
    expect(vo.quantity.value).toBe(2);
    expect(vo.status.value).toBe('active');
    expect(vo.unitPrice).toBe(100);
    expect(vo.currency).toBe(TEST_CURRENCY);
    expect(vo.addedAt).toBe(TEST_DATES.NOW);
    expect(vo.subtotal).toBe(200);
  });
});
