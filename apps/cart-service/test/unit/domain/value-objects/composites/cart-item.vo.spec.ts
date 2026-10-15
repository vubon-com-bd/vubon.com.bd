import { describe, it, expect } from '@jest/globals';
import { CartItemVO } from '@domain/value-objects/composites/cart-item.vo.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartItemVO', () => {
  const makeProps = () => ({
    id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
    productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
    quantity: CartItemQuantityVO.create(2),
    status: CartItemStatusVO.active(),
    unitPrice: 100,
    currency: TEST_CURRENCY,
    addedAt: TEST_DATES.NOW,
  });

  it('create() works', () => {
    const vo = CartItemVO.create(makeProps());
    expect(vo.quantity.value).toBe(2);
    expect(vo.subtotal).toBe(200);
    expect(vo.isPurchasable()).toBe(true);
  });

  it('reconstitute() works', () => {
    const vo = CartItemVO.reconstitute(makeProps());
    expect(vo.subtotal).toBe(200);
  });

  it('throws on negative unitPrice', () => {
    expect(() => CartItemVO.create({ ...makeProps(), unitPrice: -1 })).toThrow(ValidationError);
  });

  it('isActive() reflects status', () => {
    const vo = CartItemVO.create(makeProps());
    expect(vo.isActive()).toBe(true);
  });

  it('isPurchasable() false for removed', () => {
    const vo = CartItemVO.create({ ...makeProps(), status: CartItemStatusVO.create('removed') });
    expect(vo.isPurchasable()).toBe(false);
  });
});
