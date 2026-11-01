/**
 * Cart entity — every status transition tuple (branch coverage)
 */
import { describe, it, expect } from '@jest/globals';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index.js';

describe('CartEntity — transition branches', () => {
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

  it('activate() on inactive cart works', () => {
    const cart = makeCart();
    cart.deactivate(TEST_DATES.NOW);
    cart.activate(TEST_DATES.NOW);
    expect(cart.isActive()).toBe(true);
  });

  it('deactivate() from abandoned throws (invalid transition)', () => {
    const cart = makeCart();
    cart.applyItemCountDelta(1, TEST_DATES.NOW);
    cart.abandon(TEST_DATES.NOW);
    // abandoned → inactive is NOT allowed in state machine
    expect(() => cart.deactivate(TEST_DATES.NOW)).toThrow();
  });

  it('abandon() from inactive throws', () => {
    const cart = makeCart();
    cart.applyItemCountDelta(1, TEST_DATES.NOW);
    cart.deactivate(TEST_DATES.NOW);
    expect(() => cart.abandon(TEST_DATES.NOW)).toThrow();
  });

  it('convert() on inactive throws', () => {
    const cart = makeCart();
    cart.applyItemCountDelta(1, TEST_DATES.NOW);
    cart.deactivate(TEST_DATES.NOW);
    expect(() => cart.convert('order-1', TEST_DATES.NOW)).toThrow();
  });

  it('clear() on non-cleared works', () => {
    const cart = makeCart();
    cart.clear(TEST_DATES.NOW);
    expect(cart.isCleared()).toBe(true);
  });

  it('markMerged() from active works', () => {
    const cart = makeCart();
    cart.markMerged('other-cart', TEST_DATES.NOW);
    expect(cart.isMerged()).toBe(true);
  });

  it('updateTotals negative total throws', () => {
    const cart = makeCart();
    expect(() =>
      cart.updateTotals(
        { subtotal: 10, discount: 100, tax: 0, shipping: 0 },
        TEST_DATES.NOW,
      ),
    ).toThrow();
  });

  it('abandoned cart can be activated again', () => {
    const cart = makeCart();
    cart.applyItemCountDelta(1, TEST_DATES.NOW);
    cart.abandon(TEST_DATES.NOW);
    cart.activate(TEST_DATES.NOW);
    expect(cart.isActive()).toBe(true);
  });

  it('inactive → active works', () => {
    const cart = makeCart();
    cart.deactivate(TEST_DATES.NOW);
    cart.activate(TEST_DATES.NOW);
    expect(cart.isActive()).toBe(true);
  });

  it('expired cart cannot activate', () => {
    const cart = makeCart();
    cart.expire(TEST_DATES.NOW);
    expect(() => cart.activate(TEST_DATES.NOW)).toThrow();
  });
});
