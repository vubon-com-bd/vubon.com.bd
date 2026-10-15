/**
 * Extended entity tests — cover remaining branches
 */
import { describe, it, expect } from '@jest/globals';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { makeUserCart, TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index.js';

describe('CartEntity — extended coverage', () => {
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

  it('isInactive() returns false for active cart', () => {
    const cart = makeCart();
    expect(cart.isInactive()).toBe(false);
  });

  it('isAbandoned() returns false initially', () => {
    const cart = makeCart();
    expect(cart.isAbandoned()).toBe(false);
  });

  it('isConverted/isExpired/isMerged/isCleared all false initially', () => {
    const cart = makeCart();
    expect(cart.isConverted()).toBe(false);
    expect(cart.isExpired()).toBe(false);
    expect(cart.isMerged()).toBe(false);
    expect(cart.isCleared()).toBe(false);
  });

  it('isGuest() false for user cart', () => {
    const cart = makeCart();
    expect(cart.isGuest()).toBe(false);
  });

  it('isUser() true for user cart', () => {
    const cart = makeCart();
    expect(cart.isUser()).toBe(true);
  });

  it('canBeCheckedOut() false for empty', () => {
    const cart = makeCart();
    expect(cart.canBeCheckedOut()).toBe(false);
  });

  it('canBeAbandoned() false for empty', () => {
    const cart = makeCart();
    expect(cart.canBeAbandoned()).toBe(false);
  });

  it('canBeMerged() false for empty', () => {
    const cart = makeCart();
    expect(cart.canBeMerged()).toBe(false);
  });

  it('deactivate() moves to inactive', () => {
    const cart = makeCart();
    cart.deactivate(TEST_DATES.NOW);
    expect(cart.isInactive()).toBe(true);
  });

  it('updateNotes() on non-modifiable throws', () => {
    const cart = makeUserCart();
    cart.expire();
    expect(() => cart.updateNotes('nope', TEST_DATES.NOW)).toThrow();
  });

  it('updateTotals() rejects when not modifiable', () => {
    const cart = makeUserCart();
    cart.expire();
    expect(() =>
      cart.updateTotals(
        { subtotal: 100, discount: 0, tax: 0, shipping: 0 },
        TEST_DATES.NOW,
      ),
    ).toThrow();
  });

  it('markMerged() after converted throws transition error', () => {
    const cart = makeUserCart();
    cart.applyItemCountDelta(1, TEST_DATES.NOW);
    cart.convert('order-1', TEST_DATES.NOW);
    // Now status = converted, markMerged should fail (converted → merged not allowed)
    expect(() => cart.markMerged(TEST_IDS.CART_ID_2, TEST_DATES.NOW)).toThrow();
  });

  it('clear() when cleared is idempotent', () => {
    const cart = makeUserCart();
    cart.clear(TEST_DATES.NOW);
    expect(cart.isCleared()).toBe(true);
    // second clear
    cart.clear(TEST_DATES.NOW);
    expect(cart.isCleared()).toBe(true);
  });

  it('expire() no-op if final', () => {
    const cart = makeUserCart();
    cart.clear(TEST_DATES.NOW);
    const v = cart.version;
    cart.expire(TEST_DATES.NOW);
    expect(cart.version).toBe(v);
  });

  it('toIdVO returns CartIdVO', () => {
    const cart = makeCart();
    expect(cart.toIdVO.value).toBe(TEST_IDS.CART_ID);
  });
});

describe('CartItemEntity — extended coverage', () => {
  it('markUnavailable()', async () => {
    const { makeCartItem } = await import('../../../fixtures/index.js');
    const item = makeCartItem();
    item.markUnavailable();
    expect(item.isUnavailable()).toBe(true);
  });

  it('markOutOfStock()', async () => {
    const { makeCartItem } = await import('../../../fixtures/index.js');
    const item = makeCartItem();
    item.markOutOfStock();
    expect(item.isOutOfStock()).toBe(true);
  });

  it('isActive/isSaved false initially for removed', async () => {
    const { makeCartItem } = await import('../../../fixtures/index.js');
    const item = makeCartItem();
    item.markRemoved();
    expect(item.isActive()).toBe(false);
    expect(item.isSaved()).toBe(false);
  });

  it('hasVariant() false without variant', async () => {
    const { makeCartItem } = await import('../../../fixtures/index.js');
    const item = makeCartItem();
    expect(item.hasVariant()).toBe(false);
  });

  it('toIdVO returns CartItemIdVO', async () => {
    const { makeCartItem } = await import('../../../fixtures/index.js');
    const item = makeCartItem();
    expect(item.toIdVO.value).toBe(item.id);
  });
});
