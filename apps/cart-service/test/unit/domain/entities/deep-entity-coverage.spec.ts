/**
 * Deep entity coverage — all remaining methods
 */
import { describe, it, expect } from '@jest/globals';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index.js';

describe('CartEntity — deep', () => {
  function makeCart() {
    return CartEntity.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('canBeCleared() returns true for active', () => {
    expect(makeCart().canBeCleared()).toBe(true);
  });

  it('clear() then canBeCleared false', () => {
    const cart = makeCart();
    cart.clear(TEST_DATES.NOW);
    expect(cart.canBeCleared()).toBe(false);
  });

  it('abandon() then activate()', () => {
    const cart = makeCart();
    cart.applyItemCountDelta(1, TEST_DATES.NOW);
    cart.abandon(TEST_DATES.NOW);
    cart.activate(TEST_DATES.NOW);
    expect(cart.isActive()).toBe(true);
  });

  it('isExpiredAt default now works', () => {
    expect(makeCart().isExpiredAt()).toBe(false);
  });

  it('isExpiredAt() true for past expiry (reconstituted)', () => {
    const cart = CartEntity.reconstitute({
      id: TEST_IDS.CART_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.YESTERDAY,
      status: 'active',
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        currency: TEST_CURRENCY,
        itemCount: 0,
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 0,
        expiresAt: TEST_DATES.YESTERDAY,
        lastActivityAt: TEST_DATES.YESTERDAY,
      },
    });
    expect(cart.isExpiredAt()).toBe(true);
  });

  it('updateTotals twice changes version', () => {
    const cart = makeCart();
    const v1 = cart.version;
    cart.updateTotals({ subtotal: 100, discount: 0, tax: 0, shipping: 0 }, TEST_DATES.NOW);
    expect(cart.version).toBeGreaterThan(v1);
  });

  it('applyItemCountDelta negative from zero throws', () => {
    expect(() => makeCart().applyItemCountDelta(-1)).toThrow();
  });

  it('guest cart — isGuest true', () => {
    const cart = CartEntity.create({
      id: CartIdVO.create(TEST_IDS.CART_ID_2),
      props: {
        type: CartTypeVO.guest(),
        sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_WEEK,
      },
      now: TEST_DATES.NOW,
    });
    expect(cart.isGuest()).toBe(true);
    expect(cart.isUser()).toBe(false);
  });

  it('updateNotes works', () => {
    const cart = makeCart();
    cart.updateNotes('Test note', TEST_DATES.NOW);
    expect(cart.notes).toBe('Test note');
  });

  it('toIdVO getter', () => {
    const cart = makeCart();
    expect(cart.toIdVO.value).toBe(TEST_IDS.CART_ID);
  });

  it('get all primitive getters', () => {
    const cart = makeCart();
    expect(cart.itemCount).toBe(0);
    expect(cart.subtotal).toBe(0);
    expect(cart.discountAmount).toBe(0);
    expect(cart.taxAmount).toBe(0);
    expect(cart.shippingAmount).toBe(0);
    expect(cart.total).toBe(0);
    expect(cart.currency).toBe(TEST_CURRENCY);
    expect(cart.expiresAt).toBe(TEST_DATES.NEXT_MONTH);
    expect(cart.lastActivityAt).toBe(TEST_DATES.NOW);
    expect(cart.type.value).toBe('user');
    expect(cart.userId?.value).toBe(TEST_IDS.USER_ID);
    expect(cart.status.value).toBe('active');
  });
});

describe('CartItemEntity — deep', () => {
  function makeItem() {
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

  it('hasVariant false without variant', () => {
    expect(makeItem().hasVariant()).toBe(false);
  });

  it('isSaved true after changing to saved status', () => {
    const item = makeItem();
    item.changeStatus(CartItemStatusVO.create('saved'), TEST_DATES.NOW);
    expect(item.isSaved()).toBe(true);
  });

  it('get all getters', () => {
    const item = makeItem();
    expect(item.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(item.productId.value).toBe(TEST_IDS.PRODUCT_ID);
    expect(item.variantId).toBeUndefined();
    expect(item.quantity.value).toBe(2);
    expect(item.status.value).toBe('active');
    expect(item.unitPrice).toBe(100);
    expect(item.currency).toBe(TEST_CURRENCY);
    expect(item.note).toBeUndefined();
    expect(item.subtotal).toBe(200);
    expect(item.updatedAtInternal).toBeDefined();
    expect(item.toIdVO.value).toBe(item.id);
  });
});
