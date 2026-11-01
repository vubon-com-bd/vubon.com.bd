/**
 * Deep coverage for underserviced entities
 */
import { describe, it, expect } from '@jest/globals';

import { CartMergerEntity } from '@domain/entities/cart-merger.entity.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartShippingEntity } from '@domain/entities/cart-shipping.entity.js';
import { CartShippingIdVO } from '@domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '@domain/value-objects/primitives/cart-shipping-method.vo.js';
import { CartVoucherEntity } from '@domain/entities/cart-voucher.entity.js';
import { VoucherCodeVO } from '@domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { CartCouponEntity } from '@domain/entities/cart-coupon.entity.js';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { CartTaxEntity } from '@domain/entities/cart-tax.entity.js';
import { CartTaxIdVO } from '@domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '@domain/value-objects/primitives/cart-tax-rate.vo.js';
import { SavedForLaterEntity } from '@domain/entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '@domain/value-objects/primitives/saved-item-status.vo.js';
import { GuestCartEntity } from '@domain/entities/guest-cart.entity.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '@domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';

import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index.js';

// ─────────────────────────────────────────
describe('CartMergerEntity — deep', () => {
  function make() {
    return CartMergerEntity.create({
      id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
      props: {
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
        strategy: MergeStrategyVO.sumQuantity(),
        mergedAt: TEST_DATES.NOW,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('get all getters + toIdVO', () => {
    const m = make();
    expect(m.sourceCartId.value).toBe(TEST_IDS.CART_ID);
    expect(m.targetCartId.value).toBe(TEST_IDS.CART_ID_2);
    expect(m.strategy.value).toBe('sum_quantity');
    expect(m.mergedAt).toBe(TEST_DATES.NOW);
    expect(m.itemsMerged).toBe(0);
    expect(m.conflicts).toBe(0);
    expect(m.toIdVO.value).toBe(TEST_IDS.MERGER_ID);
    expect(m.failureReason).toBeUndefined();
  });

  it('recordConflict then resolveConflict', () => {
    const m = make();
    m.recordConflict(TEST_DATES.NOW);
    expect(m.conflicts).toBe(1);
    m.resolveConflict(TEST_IDS.PRODUCT_ID, TEST_DATES.NOW);
    expect(m.conflicts).toBe(0);
  });

  it('resolveConflict with no conflicts throws', () => {
    expect(() => make().resolveConflict(TEST_IDS.PRODUCT_ID, TEST_DATES.NOW)).toThrow();
  });

  it('complete() then isCompleted', () => {
    const m = make();
    m.complete(5, TEST_DATES.NOW);
    expect(m.isCompleted()).toBe(true);
    expect(m.itemsMerged).toBe(5);
  });

  it('complete() with non-integer throws', () => {
    expect(() => make().complete(1.5, TEST_DATES.NOW)).toThrow();
  });

  it('complete() after failed throws', () => {
    const m = make();
    m.fail('reason', TEST_DATES.NOW);
    expect(() => m.complete(3, TEST_DATES.NOW)).toThrow();
  });

  it('fail() twice is no-op', () => {
    const m = make();
    m.fail('r1', TEST_DATES.NOW);
    m.fail('r2', TEST_DATES.NOW);
    expect(m.failureReason).toBe('r1');
  });

  it('reconstitute() full state', () => {
    const m = CartMergerEntity.reconstitute({
      id: TEST_IDS.MERGER_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
        strategy: MergeStrategyVO.sumQuantity(),
        mergedAt: TEST_DATES.NOW,
      },
      itemsMerged: 10,
      conflicts: 2,
      completed: true,
      version: 5,
    });
    expect(m.itemsMerged).toBe(10);
    expect(m.conflicts).toBe(2);
    expect(m.version).toBe(5);
  });

  it('reconstitute with failed state', () => {
    const m = CartMergerEntity.reconstitute({
      id: TEST_IDS.MERGER_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
        strategy: MergeStrategyVO.sumQuantity(),
        mergedAt: TEST_DATES.NOW,
      },
      failed: true,
      failureReason: 'crashed',
    });
    expect(m.isFailed()).toBe(true);
    expect(m.failureReason).toBe('crashed');
  });
});

// ─────────────────────────────────────────
describe('CartShippingEntity — deep', () => {
  function make() {
    return CartShippingEntity.create({
      id: 'ssssssss-ssss-4sss-8sss-ssssssssssss',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        shippingId: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
        method: CartShippingMethodVO.standard(),
        cost: 50,
        currency: TEST_CURRENCY,
        freeAbove: 500,
        estimatedDays: 3,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('all getters + toIdVO', () => {
    const s = make();
    expect(s.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(s.shippingId.value).toBe(TEST_IDS.SHIPPING_ID);
    expect(s.method.isStandard()).toBe(true);
    expect(s.cost).toBe(50);
    expect(s.currency).toBe(TEST_CURRENCY);
    expect(s.freeAbove).toBe(500);
    expect(s.estimatedDays).toBe(3);
    expect(s.addressId).toBeUndefined();
    expect(s.updatedAtInternal).toBeDefined();
  });

  it('changeMethod()', () => {
    const s = make();
    s.changeMethod(CartShippingMethodVO.create('express'), TEST_DATES.NOW);
    expect(s.method.isExpress()).toBe(true);
  });

  it('setCost()', () => {
    const s = make();
    s.setCost(75, TEST_DATES.NOW);
    expect(s.cost).toBe(75);
  });

  it('setAddress() then hasAddress true', () => {
    const s = make();
    s.setAddress(AddressIdVO.create(TEST_IDS.ADDRESS_ID), TEST_DATES.NOW);
    expect(s.hasAddress()).toBe(true);
    expect(s.addressId?.value).toBe(TEST_IDS.ADDRESS_ID);
  });

  it('no freeAbove → isFree false', () => {
    const s = CartShippingEntity.create({
      id: 'ssssssss-ssss-4sss-8sss-ssssssssssss',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        shippingId: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
        method: CartShippingMethodVO.standard(),
        cost: 50,
        currency: TEST_CURRENCY,
      },
      now: TEST_DATES.NOW,
    });
    expect(s.freeAbove).toBeUndefined();
    expect(s.estimatedDays).toBeUndefined();
    expect(s.isFree(1000)).toBe(false);
  });

  it('reconstitute()', () => {
    const s = CartShippingEntity.reconstitute({
      id: 'ssssssss-ssss-4sss-8sss-ssssssssssss',
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        shippingId: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
        method: CartShippingMethodVO.standard(),
        cost: 60,
        currency: TEST_CURRENCY,
      },
    });
    expect(s.cost).toBe(60);
  });

  it('throws on negative cost', () => {
    expect(() =>
      CartShippingEntity.create({
        id: 'ssssssss-ssss-4sss-8sss-ssssssssssss',
        props: {
          cartId: CartIdVO.create(TEST_IDS.CART_ID),
          shippingId: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
          method: CartShippingMethodVO.standard(),
          cost: -1,
          currency: TEST_CURRENCY,
        },
        now: TEST_DATES.NOW,
      }),
    ).toThrow();
  });
});

// ─────────────────────────────────────────
describe('CartVoucherEntity — deep', () => {
  function make(remaining = 500) {
    return CartVoucherEntity.create({
      id: 'vvvvvvvv-vvvv-4vvv-8vvv-vvvvvvvvvvvv',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        code: VoucherCodeVO.create('GIFT1234'),
        status: VoucherStatusVO.active(),
        remainingAmount: remaining,
        appliedAmount: 0,
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('all getters', () => {
    const v = make();
    expect(v.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(v.code.value).toBe('GIFT1234');
    expect(v.status.value).toBe('active');
    expect(v.remainingAmount).toBe(500);
    expect(v.appliedAmount).toBe(0);
    expect(v.currency).toBe(TEST_CURRENCY);
    expect(v.expiresAt).toBe(TEST_DATES.NEXT_MONTH);
    expect(v.updatedAtInternal).toBeDefined();
  });

  it('predicates — isRedeemable, isFinal, hasBalance', () => {
    expect(make().isRedeemable()).toBe(true);
    expect(make().isFinal()).toBe(false);
    expect(make().hasBalance()).toBe(true);
  });

  it('canBeApplied', () => {
    expect(make().canBeApplied()).toBe(true);
  });

  it('canBeApplied false for expired', () => {
    const v = CartVoucherEntity.create({
      id: 'vvvvvvvv-vvvv-4vvv-8vvv-vvvvvvvvvvvv',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        code: VoucherCodeVO.create('GIFT1234'),
        status: VoucherStatusVO.active(),
        remainingAmount: 500,
        appliedAmount: 0,
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.YESTERDAY,
      },
      now: TEST_DATES.NOW,
    });
    expect(v.isExpired()).toBe(true);
    expect(v.canBeApplied()).toBe(false);
  });

  it('isExpired with default now', () => {
    expect(make().isExpired()).toBe(false);
  });

  it('canCover', () => {
    expect(make(50).canCover(30)).toBe(true);
    expect(make(50).canCover(100)).toBe(false);
  });

  it('applyAmount + redeem', () => {
    const v = make(500);
    v.applyAmount(100, TEST_DATES.NOW);
    expect(v.appliedAmount).toBe(100);
    expect(v.remainingAmount).toBe(400);
    v.redeem(TEST_DATES.NOW);
    expect(v.isFinal()).toBe(true);
  });

  it('applyAmount insufficient throws', () => {
    expect(() => make(50).applyAmount(100, TEST_DATES.NOW)).toThrow();
  });

  it('applyAmount negative throws', () => {
    expect(() => make(500).applyAmount(-1, TEST_DATES.NOW)).toThrow();
  });

  it('redeem on non-redeemable throws', () => {
    const v = make();
    v.redeem(TEST_DATES.NOW);
    expect(() => v.redeem(TEST_DATES.NOW)).toThrow();
  });

  it('reconstitute()', () => {
    const v = CartVoucherEntity.reconstitute({
      id: 'vvvvvvvv-vvvv-4vvv-8vvv-vvvvvvvvvvvv',
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        code: VoucherCodeVO.create('GIFT1234'),
        status: VoucherStatusVO.active(),
        remainingAmount: 300,
        appliedAmount: 200,
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
    });
    expect(v.remainingAmount).toBe(300);
    expect(v.appliedAmount).toBe(200);
  });
});

// ─────────────────────────────────────────
describe('CartCouponEntity — deep', () => {
  function make() {
    return CartCouponEntity.create({
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        code: CouponCodeVO.create('SAVE20'),
        status: CouponStatusVO.active(),
        discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
        appliedDiscountAmount: 0,
        currency: TEST_CURRENCY,
        minOrderAmount: 100,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('all getters', () => {
    const c = make();
    expect(c.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(c.code.value).toBe('SAVE20');
    expect(c.status.value).toBe('active');
    expect(c.discount.isPercentage()).toBe(true);
    expect(c.appliedDiscountAmount).toBe(0);
    expect(c.currency).toBe(TEST_CURRENCY);
    expect(c.minOrderAmount).toBe(100);
    expect(c.expiresAt).toBe(TEST_DATES.NEXT_MONTH);
    expect(c.updatedAtInternal).toBeDefined();
  });

  it('isUsable / isFinal', () => {
    expect(make().isUsable()).toBe(true);
    expect(make().isFinal()).toBe(false);
  });

  it('meetsMinOrder / canBeApplied', () => {
    const c = make();
    expect(c.meetsMinOrder(100)).toBe(true);
    expect(c.meetsMinOrder(50)).toBe(false);
    expect(c.canBeApplied(150)).toBe(true);
    expect(c.canBeApplied(50)).toBe(false);
  });

  it('isExpired with default now', () => {
    expect(make().isExpired()).toBe(false);
  });

  it('updateAppliedAmount', () => {
    const c = make();
    c.updateAppliedAmount(30, TEST_DATES.NOW);
    expect(c.appliedDiscountAmount).toBe(30);
  });

  it('updateAppliedAmount negative throws', () => {
    expect(() => make().updateAppliedAmount(-1)).toThrow();
  });

  it('disable()', () => {
    const c = make();
    c.disable(TEST_DATES.NOW);
    expect(c.isUsable()).toBe(false);
  });

  it("disable() is idempotent on final coupon", () => {
    const c = make();
    c.disable(TEST_DATES.NOW);
    expect(c.isUsable()).toBe(false);
    // Second call is a silent no-op (status already disabled)
    c.disable(TEST_DATES.NOW);
    expect(c.isUsable()).toBe(false);
  });

  it('reconstitute()', () => {
    const c = CartCouponEntity.reconstitute({
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        code: CouponCodeVO.create('SAVE20'),
        status: CouponStatusVO.active(),
        discount: CouponDiscountVO.create({ type: 'fixed', value: 50 }),
        appliedDiscountAmount: 25,
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
    });
    expect(c.appliedDiscountAmount).toBe(25);
  });
});

// ─────────────────────────────────────────
describe('CartTaxEntity — deep', () => {
  function make() {
    return CartTaxEntity.create({
      id: 'tttttttt-tttt-4ttt-8ttt-tttttttttttt',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        taxId: CartTaxIdVO.create(TEST_IDS.TAX_ID),
        rate: CartTaxRateVO.create(15),
        label: 'VAT',
        inclusive: false,
        taxAmount: 0,
        currency: TEST_CURRENCY,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('all getters', () => {
    const t = make();
    expect(t.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(t.taxId.value).toBe(TEST_IDS.TAX_ID);
    expect(t.rate.value).toBe(15);
    expect(t.label).toBe('VAT');
    expect(t.inclusive).toBe(false);
    expect(t.taxAmount).toBe(0);
    expect(t.currency).toBe(TEST_CURRENCY);
    expect(t.updatedAtInternal).toBeDefined();
  });

  it('isInclusive / isExclusive / isZero', () => {
    expect(make().isExclusive()).toBe(true);
    expect(make().isInclusive()).toBe(false);
    expect(make().isZero()).toBe(false);
  });

  it('inclusive variant', () => {
    const t = CartTaxEntity.create({
      id: 'tttttttt-tttt-4ttt-8ttt-tttttttttttt',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        taxId: CartTaxIdVO.create(TEST_IDS.TAX_ID),
        rate: CartTaxRateVO.create(15),
        label: 'VAT',
        inclusive: true,
        taxAmount: 0,
        currency: TEST_CURRENCY,
      },
      now: TEST_DATES.NOW,
    });
    expect(t.isInclusive()).toBe(true);
  });

  it('recalculate', () => {
    const t = make();
    t.recalculate(200, TEST_DATES.NOW);
    expect(t.taxAmount).toBe(30);
  });

  it('recalculate negative throws', () => {
    expect(() => make().recalculate(-1, TEST_DATES.NOW)).toThrow();
  });

  it('changeRate', () => {
    const t = make();
    t.changeRate(CartTaxRateVO.create(20), TEST_DATES.NOW);
    expect(t.rate.value).toBe(20);
  });

  it('reconstitute()', () => {
    const t = CartTaxEntity.reconstitute({
      id: 'tttttttt-tttt-4ttt-8ttt-tttttttttttt',
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        taxId: CartTaxIdVO.create(TEST_IDS.TAX_ID),
        rate: CartTaxRateVO.create(15),
        label: 'VAT',
        inclusive: false,
        taxAmount: 30,
        currency: TEST_CURRENCY,
      },
    });
    expect(t.taxAmount).toBe(30);
  });

  it('throws on empty label', () => {
    expect(() =>
      CartTaxEntity.create({
        id: 'tttttttt-tttt-4ttt-8ttt-tttttttttttt',
        props: {
          cartId: CartIdVO.create(TEST_IDS.CART_ID),
          taxId: CartTaxIdVO.create(TEST_IDS.TAX_ID),
          rate: CartTaxRateVO.create(15),
          label: '',
          inclusive: false,
          taxAmount: 0,
          currency: TEST_CURRENCY,
        },
        now: TEST_DATES.NOW,
      }),
    ).toThrow();
  });
});

// ─────────────────────────────────────────
describe('SavedForLaterEntity — deep', () => {
  function make() {
    return SavedForLaterEntity.create({
      id: SavedItemIdVO.create(TEST_IDS.SAVED_ITEM_ID),
      props: {
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        savedAt: TEST_DATES.NOW,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('all getters + toIdVO', () => {
    const s = make();
    expect(s.userId.value).toBe(TEST_IDS.USER_ID);
    expect(s.productId.value).toBe(TEST_IDS.PRODUCT_ID);
    expect(s.variantId).toBeUndefined();
    expect(s.status.value).toBe('active');
    expect(s.note).toBeUndefined();
    expect(s.savedAt).toBe(TEST_DATES.NOW);
    expect(s.toIdVO.value).toBe(TEST_IDS.SAVED_ITEM_ID);
  });

  it('predicates — isActive, isRemoved, isMovedToCart, isFinal', () => {
    const s = make();
    expect(s.isActive()).toBe(true);
    expect(s.isRemoved()).toBe(false);
    expect(s.isMovedToCart()).toBe(false);
    expect(s.isFinal()).toBe(false);
  });

  it('canMoveToCart()', () => {
    expect(make().canMoveToCart()).toBe(true);
  });

  it('updateNote', () => {
    const s = make();
    s.updateNote('Buy later', TEST_DATES.NOW);
    expect(s.note).toBe('Buy later');
  });

  it('updateNote too long throws', () => {
    expect(() => make().updateNote('x'.repeat(501), TEST_DATES.NOW)).toThrow();
  });

  it('updateNote on final throws', () => {
    const s = make();
    s.remove(TEST_DATES.NOW);
    expect(() => s.updateNote('no', TEST_DATES.NOW)).toThrow();
  });

  it('moveToCart then canMoveToCart false', () => {
    const s = make();
    s.moveToCart(TEST_DATES.NOW);
    expect(s.isMovedToCart()).toBe(true);
    expect(s.canMoveToCart()).toBe(false);
  });

  it('moveToCart twice throws', () => {
    const s = make();
    s.moveToCart(TEST_DATES.NOW);
    expect(() => s.moveToCart(TEST_DATES.NOW)).toThrow();
  });

  it('remove then isRemoved', () => {
    const s = make();
    s.remove(TEST_DATES.NOW);
    expect(s.isRemoved()).toBe(true);
  });

  it('reconstitute()', () => {
    const s = SavedForLaterEntity.reconstitute({
      id: TEST_IDS.SAVED_ITEM_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      status: 'active',
      props: {
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        productId: ProductIdVO.create(TEST_IDS.PRODUCT_ID),
        note: 'note',
        savedAt: TEST_DATES.YESTERDAY,
      },
      version: 3,
    });
    expect(s.note).toBe('note');
    expect(s.version).toBe(3);
  });
});

// ─────────────────────────────────────────
describe('GuestCartEntity — deep', () => {
  function make() {
    return GuestCartEntity.create({
      id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
      props: {
        token: GuestTokenVO.create('guest-token-1234567890'),
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        expiresAt: TEST_DATES.NEXT_WEEK,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('all getters + toIdVO', () => {
    const g = make();
    expect(g.token.value).toBe('guest-token-1234567890');
    expect(g.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(g.status.value).toBe('active');
    expect(g.itemCount).toBe(2);
    expect(g.expiresAt).toBe(TEST_DATES.NEXT_WEEK);
    expect(g.toIdVO.value).toBe(TEST_IDS.GUEST_CART_ID);
  });

  it('predicates', () => {
    const g = make();
    expect(g.isActive()).toBe(true);
    expect(g.isExpiredStatus()).toBe(false);
    expect(g.isMerged()).toBe(false);
    expect(g.isAbandoned()).toBe(false);
    expect(g.isFinal()).toBe(false);
  });

  it('isExpiredAt default now', () => {
    expect(make().isExpiredAt()).toBe(false);
  });

  it('isExpiredAt past', () => {
    const g = GuestCartEntity.reconstitute({
      id: TEST_IDS.GUEST_CART_ID,
      createdAt: TEST_DATES.THIRTY_DAYS_AGO,
      updatedAt: TEST_DATES.THIRTY_DAYS_AGO,
      status: 'active',
      props: {
        token: GuestTokenVO.create('guest-token-1234567890'),
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        expiresAt: TEST_DATES.YESTERDAY,
      },
    });
    expect(g.isExpiredAt()).toBe(true);
  });

  it('canMerge()', () => {
    expect(make().canMerge()).toBe(true);
  });

  it('updateItemCount', () => {
    const g = make();
    g.updateItemCount(5, TEST_DATES.NOW);
    expect(g.itemCount).toBe(5);
  });

  it('updateItemCount negative throws', () => {
    expect(() => make().updateItemCount(-1)).toThrow();
  });

  it('markMerged', () => {
    const g = make();
    g.markMerged(TEST_IDS.CART_ID, TEST_DATES.NOW);
    expect(g.isMerged()).toBe(true);
  });

  it('expire', () => {
    const g = make();
    g.expire(TEST_DATES.NOW);
    expect(g.isExpiredStatus()).toBe(true);
  });

  it('expire on final is no-op', () => {
    const g = make();
    g.expire(TEST_DATES.NOW);
    const v = g.version;
    g.expire(TEST_DATES.NOW);
    expect(g.version).toBe(v);
  });

  it('abandon', () => {
    const g = make();
    g.abandon(TEST_DATES.NOW);
    expect(g.isAbandoned()).toBe(true);
  });

  it('abandon on non-active is no-op', () => {
    const g = make();
    g.expire(TEST_DATES.NOW);
    const v = g.version;
    g.abandon(TEST_DATES.NOW);
    expect(g.version).toBe(v);
  });

  it('markMerged on empty throws', () => {
    const g = make();
    g.updateItemCount(0, TEST_DATES.NOW);
    expect(() => g.markMerged(TEST_IDS.CART_ID, TEST_DATES.NOW)).toThrow();
  });

  it('reconstitute()', () => {
    const g = GuestCartEntity.reconstitute({
      id: TEST_IDS.GUEST_CART_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      status: 'active',
      props: {
        token: GuestTokenVO.create('guest-token-1234567890'),
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 5,
        expiresAt: TEST_DATES.NEXT_WEEK,
      },
      version: 4,
    });
    expect(g.itemCount).toBe(5);
    expect(g.version).toBe(4);
  });
});

// ─────────────────────────────────────────
describe('AbandonedCartEntity — deep', () => {
  function make() {
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

  it('all getters + toIdVO', () => {
    const a = make();
    expect(a.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(a.itemCount).toBe(2);
    expect(a.cartValue).toBe(200);
    expect(a.currency).toBe(TEST_CURRENCY);
    expect(a.abandonedAt).toBe(TEST_DATES.TWO_DAYS_AGO);
    expect(a.status.value).toBe('pending');
    expect(a.remindersSent).toBe(0);
    expect(a.userId).toBeUndefined();
    expect(a.email).toBeUndefined();
    expect(a.lastReminderAt).toBeUndefined();
    expect(a.recoveredAt).toBeUndefined();
    expect(a.recoveredOrderId).toBeUndefined();
    expect(a.recoveryDiscountPercent).toBeUndefined();
    expect(a.toIdVO.value).toBe(TEST_IDS.ABANDONED_CART_ID);
  });

  it('hasEmail false when no email', () => {
    expect(make().hasEmail()).toBe(false);
  });

  it('hasEmail true when email present', () => {
    const a = AbandonedCartEntity.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        email: 'test@example.com',
        itemCount: 2,
        cartValue: 200,
        currency: TEST_CURRENCY,
        abandonedAt: TEST_DATES.TWO_DAYS_AGO,
        remindersSent: 0,
      },
      now: TEST_DATES.NOW,
    });
    expect(a.hasEmail()).toBe(true);
    expect(a.email).toBe('test@example.com');
  });

  it('canSendReminder', () => {
    const a = make();
    expect(a.canSendReminder()).toBe(true);
    for (let i = 0; i < 4; i++) a.sendReminder('email', TEST_DATES.NOW);
    expect(a.canSendReminder()).toBe(false);
  });

  it('sendReminder 4 times then throws on 5th', () => {
    const a = make();
    for (let i = 0; i < 4; i++) a.sendReminder('email', TEST_DATES.NOW);
    expect(() => a.sendReminder('sms', TEST_DATES.NOW)).toThrow();
  });

  it('sendReminder updates lastReminderAt', () => {
    const a = make();
    a.sendReminder('email', TEST_DATES.NOW);
    expect(a.lastReminderAt).toBe(TEST_DATES.NOW);
  });

  it('sendReminder on non-recoverable throws', () => {
    const a = make();
    a.markLost('reason', TEST_DATES.NOW);
    expect(() => a.sendReminder('email', TEST_DATES.NOW)).toThrow();
  });

  it('recover sets state', () => {
    const a = make();
    a.recover('order-123', TEST_DATES.NOW);
    expect(a.isRecovered()).toBe(true);
    expect(a.recoveredAt).toBe(TEST_DATES.NOW);
    expect(a.recoveredOrderId).toBe('order-123');
  });

  it('recover on non-recoverable throws', () => {
    const a = make();
    a.markLost('reason', TEST_DATES.NOW);
    expect(() => a.recover('order-1', TEST_DATES.NOW)).toThrow();
  });

  it('markLost', () => {
    const a = make();
    a.markLost('no interest', TEST_DATES.NOW);
    expect(a.isLost()).toBe(true);
  });

  it('markLost on final no-op', () => {
    const a = make();
    a.recover('order-1', TEST_DATES.NOW);
    const v = a.version;
    a.markLost('r', TEST_DATES.NOW);
    expect(a.version).toBe(v);
  });

  it('unsubscribe', () => {
    const a = make();
    a.unsubscribe(TEST_DATES.NOW);
    expect(a.isUnsubscribed()).toBe(true);
  });

  it('unsubscribe twice idempotent', () => {
    const a = make();
    a.unsubscribe(TEST_DATES.NOW);
    const v = a.version;
    a.unsubscribe(TEST_DATES.NOW);
    expect(a.version).toBe(v);
  });

  it('reconstitute with recoveryDiscountPercent', () => {
    const a = AbandonedCartEntity.reconstitute({
      id: TEST_IDS.ABANDONED_CART_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      status: 'pending',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        cartValue: 200,
        currency: TEST_CURRENCY,
        abandonedAt: TEST_DATES.TWO_DAYS_AGO,
        remindersSent: 2,
        lastReminderAt: TEST_DATES.YESTERDAY,
        recoveryDiscountPercent: 10,
      },
      version: 4,
    });
    expect(a.remindersSent).toBe(2);
    expect(a.recoveryDiscountPercent).toBe(10);
    expect(a.version).toBe(4);
  });
});
