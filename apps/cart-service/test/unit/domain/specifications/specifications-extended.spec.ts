/**
 * Extended specification tests — cover explain() branches
 */
import { describe, it, expect } from '@jest/globals';
import { CanAddItemSpecification } from '@domain/specifications/can-add-item.specification.js';
import { CanCheckoutSpecification } from '@domain/specifications/can-checkout.specification.js';
import { CanApplyCouponSpecification } from '@domain/specifications/can-apply-coupon.specification.js';
import { CanMergeSpecification } from '@domain/specifications/can-merge.specification.js';
import { CanSaveForLaterSpecification } from '@domain/specifications/can-save-for-later.specification.js';
import { CanRecoverSpecification } from '@domain/specifications/can-recover.specification.js';
import { makeUserCart, makeGuestCart, makeCartItem, makeCartCoupon } from '../../../fixtures/index.js';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index.js';

describe('CanAddItemSpecification — extended', () => {
  it('rejects quantity above max', () => {
    const cart = makeUserCart();
    const spec = new CanAddItemSpecification();
    const r = spec.explain({ cart, existingItems: [], requestedQuantity: 10000 });
    expect(r).toMatch(/Quantity/);
  });

  it('static strict()', () => {
    expect(CanAddItemSpecification.strict()).toBeInstanceOf(CanAddItemSpecification);
  });
});

describe('CanCheckoutSpecification — extended', () => {
  it('rejects non-purchasable items', () => {
    const cart = makeUserCart({ total: 100 });
    const item = makeCartItem();
    item.markOutOfStock();
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [item] })).toBe(false);
  });

  it('rejects zero total', () => {
    const cart = makeUserCart();
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [makeCartItem()] })).toBe(false);
  });

  it('static strict()', () => {
    expect(CanCheckoutSpecification.strict()).toBeInstanceOf(CanCheckoutSpecification);
  });
});

describe('CanApplyCouponSpecification — extended', () => {
  it('rejects not modifiable cart', () => {
    const cart = makeUserCart();
    cart.expire();
    const spec = new CanApplyCouponSpecification();
    expect(
      spec.isSatisfiedBy({ cart, subtotal: 100, alreadyApplied: [], code: 'SAVE20' }),
    ).toBe(false);
  });

  it('rejects when coupon limit reached before duplicate check', () => {
    const cart = makeUserCart();
    const coupon = makeCartCoupon({ code: 'SAVE20' });
    const spec = new CanApplyCouponSpecification();
    const r = spec.explain({
      cart,
      subtotal: 100,
      alreadyApplied: [coupon],
      code: 'SAVE20',
    });
    // With 1 active coupon and default max 1 → limit reached takes precedence
    expect(r).toMatch(/limit/i);
  });

  it('rejects duplicate when limit not reached', () => {
    const cart = makeUserCart();
    const coupon = makeCartCoupon({ code: 'SAVE20' });
    const spec = new CanApplyCouponSpecification();
    const r = spec.explain({
      cart,
      subtotal: 100,
      alreadyApplied: [coupon],
      code: 'SAVE20',
      maxCoupons: 5,
    });
    expect(r).toMatch(/already/i);
  });

  it('rejects coupon limit', () => {
    const cart = makeUserCart();
    const existing = makeCartCoupon({ code: 'OTHER123' });
    const spec = new CanApplyCouponSpecification();
    const r = spec.explain({
      cart,
      subtotal: 100,
      alreadyApplied: [existing],
      code: 'SAVE20',
      maxCoupons: 1,
    });
    expect(r).toMatch(/limit/i);
  });

  it('static strict()', () => {
    expect(CanApplyCouponSpecification.strict()).toBeInstanceOf(CanApplyCouponSpecification);
  });
});

describe('CanMergeSpecification — extended', () => {
  it('rejects inactive source', () => {
    const source = makeGuestCart();
    source.applyItemCountDelta(1);
    source.expire();
    const target = makeUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(false);
  });

  it('rejects non-modifiable target', () => {
    const source = makeGuestCart();
    source.applyItemCountDelta(1);
    const target = makeUserCart();
    // Make target non-modifiable: expire instead of convert
    target.expire();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(false);
  });

  it('static strict()', () => {
    expect(CanMergeSpecification.strict()).toBeInstanceOf(CanMergeSpecification);
  });
});

describe('CanSaveForLaterSpecification — extended', () => {
  it('rejects non-modifiable cart', () => {
    const cart = makeUserCart();
    cart.expire();
    const item = makeCartItem();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: false })).toBe(false);
  });

  it('rejects already saved', () => {
    const cart = makeUserCart();
    const item = makeCartItem();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: true })).toBe(false);
  });

  it('static strict()', () => {
    expect(CanSaveForLaterSpecification.strict()).toBeInstanceOf(CanSaveForLaterSpecification);
  });
});

describe('CanRecoverSpecification — extended', () => {
  function makeAbandoned() {
    return AbandonedCartEntity.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        cartValue: 200,
        currency: TEST_CURRENCY,
        abandonedAt: TEST_DATES.TWO_DAYS_AGO,
        remindersSent: 0,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('rejects when cartValue is zero', () => {
    const a = AbandonedCartEntity.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 0,
        cartValue: 0,
        currency: TEST_CURRENCY,
        abandonedAt: TEST_DATES.TWO_DAYS_AGO,
        remindersSent: 0,
      },
      now: TEST_DATES.NOW,
    });
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned: a, cart: null })).toBe(false);
  });

  it('rejects when cart is final (expired)', () => {
    const a = makeAbandoned();
    const cart = makeUserCart();
    cart.expire();
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned: a, cart })).toBe(false);
  });

  it('rejects already recovered', () => {
    const a = makeAbandoned();
    a.recover('order-1');
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned: a, cart: null })).toBe(false);
  });

  it('static strict()', () => {
    expect(CanRecoverSpecification.strict()).toBeInstanceOf(CanRecoverSpecification);
  });
});
