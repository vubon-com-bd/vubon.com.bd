/**
 * CartItemEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { CartItemNoteVO } from '@domain/value-objects/primitives/cart-item-note.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CartItemEntity', () => {
  function createItem() {
    return CartItemEntity.create({
      id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        quantity: CartItemQuantityVO.create(2),
        unitPrice: 100,
        currency: TEST_CURRENCY,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('create() builds active item', () => {
    const item = createItem();
    expect(item.isActive()).toBe(true);
    expect(item.quantity.value).toBe(2);
    expect(item.subtotal).toBe(200);
  });

  it('throws on negative unitPrice', () => {
    expect(() =>
      CartItemEntity.create({
        id: CartItemIdVO.create(TEST_IDS.CART_ITEM_ID),
        props: {
          cartId: CartIdVO.create(TEST_IDS.CART_ID),
          productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
          quantity: CartItemQuantityVO.create(1),
          unitPrice: -10,
          currency: TEST_CURRENCY,
        },
        now: TEST_DATES.NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('changeQuantity() updates quantity', () => {
    const item = createItem();
    item.changeQuantity(CartItemQuantityVO.create(5), TEST_DATES.NOW);
    expect(item.quantity.value).toBe(5);
    expect(item.subtotal).toBe(500);
  });

  it('increaseQuantity() / decreaseQuantity()', () => {
    const item = createItem();
    item.increaseQuantity(CartItemQuantityVO.create(1), TEST_DATES.NOW);
    expect(item.quantity.value).toBe(3);
    item.decreaseQuantity(CartItemQuantityVO.create(1), TEST_DATES.NOW);
    expect(item.quantity.value).toBe(2);
  });

  it('changeStatus() enforces state machine', () => {
    const item = createItem();
    item.changeStatus(CartItemStatusVO.create('out_of_stock'), TEST_DATES.NOW);
    expect(item.isOutOfStock()).toBe(true);
    // Invalid: out_of_stock → saved
    expect(() =>
      item.changeStatus(CartItemStatusVO.create('saved'), TEST_DATES.NOW),
    ).toThrow(BusinessRuleError);
  });

  it('markRemoved() makes item final', () => {
    const item = createItem();
    item.markRemoved(TEST_DATES.NOW);
    expect(item.isRemoved()).toBe(true);
    expect(() =>
      item.changeQuantity(CartItemQuantityVO.create(1), TEST_DATES.NOW),
    ).toThrow(BusinessRuleError);
  });

  it('updateNote() sets note', () => {
    const item = createItem();
    item.updateNote(CartItemNoteVO.create('Gift wrap'), TEST_DATES.NOW);
    expect(item.hasNote()).toBe(true);
    expect(item.note?.value).toBe('Gift wrap');
  });

  it('clearNote() removes note', () => {
    const item = createItem();
    item.updateNote(CartItemNoteVO.create('X'), TEST_DATES.NOW);
    item.clearNote(TEST_DATES.NOW);
    expect(item.hasNote()).toBe(false);
  });

  it('updateUnitPrice() recomputes subtotal', () => {
    const item = createItem();
    item.updateUnitPrice(50, TEST_DATES.NOW);
    expect(item.unitPrice).toBe(50);
    expect(item.subtotal).toBe(100);
  });

  it('updateUnitPrice() rejects negative', () => {
    const item = createItem();
    expect(() => item.updateUnitPrice(-5, TEST_DATES.NOW)).toThrow(ValidationError);
  });

  it('reconstitute() rebuilds item', () => {
    const item = CartItemEntity.reconstitute({
      id: TEST_IDS.CART_ITEM_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        quantity: CartItemQuantityVO.create(3),
        status: CartItemStatusVO.create('active'),
        unitPrice: 75,
        currency: TEST_CURRENCY,
      },
    });
    expect(item.quantity.value).toBe(3);
    expect(item.subtotal).toBe(225);
  });
});
