/**
 * Final branch coverage — status VOs + edge transitions
 */
import { describe, it, expect } from '@jest/globals';
import { SavedItemStatusVO } from '@domain/value-objects/primitives/saved-item-status.vo.js';
import { AbandonedCartStatusVO } from '@domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { GuestCartStatusVO } from '@domain/value-objects/primitives/guest-cart-status.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { CartShippingMethodVO } from '@domain/value-objects/primitives/cart-shipping-method.vo.js';

describe('Final branch coverage — statuses', () => {
  it('SavedItemStatusVO state machine edges', () => {
    expect(SavedItemStatusVO.active().canTransitionTo('moved_to_cart')).toBe(true);
    expect(SavedItemStatusVO.active().canTransitionTo('removed')).toBe(true);
    expect(SavedItemStatusVO.create('moved_to_cart').canTransitionTo('active')).toBe(true);
    expect(SavedItemStatusVO.create('moved_to_cart').canTransitionTo('removed')).toBe(true);
    expect(SavedItemStatusVO.create('removed').canTransitionTo('active')).toBe(false);
    expect(SavedItemStatusVO.create('out_of_stock').canTransitionTo('active')).toBe(true);
    expect(SavedItemStatusVO.create('unavailable').canTransitionTo('active')).toBe(true);
  });

  it('AbandonedCartStatusVO state machine edges', () => {
    expect(AbandonedCartStatusVO.pending().canTransitionTo('reminded')).toBe(true);
    expect(AbandonedCartStatusVO.pending().canTransitionTo('recovered')).toBe(true);
    expect(AbandonedCartStatusVO.pending().canTransitionTo('lost')).toBe(true);
    expect(AbandonedCartStatusVO.pending().canTransitionTo('unsubscribed')).toBe(true);
    expect(AbandonedCartStatusVO.create('reminded').canTransitionTo('reminded')).toBe(true);
    expect(AbandonedCartStatusVO.create('recovered').canTransitionTo('pending')).toBe(false);
    expect(AbandonedCartStatusVO.create('lost').canTransitionTo('pending')).toBe(false);
    expect(AbandonedCartStatusVO.create('unsubscribed').canTransitionTo('pending')).toBe(true);
  });

  it('VoucherStatusVO state machine edges', () => {
    expect(VoucherStatusVO.active().canTransitionTo('inactive')).toBe(true);
    expect(VoucherStatusVO.active().canTransitionTo('redeemed')).toBe(true);
    expect(VoucherStatusVO.active().canTransitionTo('expired')).toBe(true);
    expect(VoucherStatusVO.active().canTransitionTo('cancelled')).toBe(true);
    expect(VoucherStatusVO.create('inactive').canTransitionTo('active')).toBe(true);
    expect(VoucherStatusVO.create('inactive').canTransitionTo('cancelled')).toBe(true);
    expect(VoucherStatusVO.create('scheduled').canTransitionTo('active')).toBe(true);
    expect(VoucherStatusVO.create('scheduled').canTransitionTo('cancelled')).toBe(true);
    expect(VoucherStatusVO.create('redeemed').canTransitionTo('active')).toBe(false);
    expect(VoucherStatusVO.create('expired').canTransitionTo('active')).toBe(false);
    expect(VoucherStatusVO.create('cancelled').canTransitionTo('active')).toBe(false);
  });

  it('CouponStatusVO state machine edges', () => {
    expect(CouponStatusVO.active().canTransitionTo('inactive')).toBe(true);
    expect(CouponStatusVO.active().canTransitionTo('expired')).toBe(true);
    expect(CouponStatusVO.active().canTransitionTo('exhausted')).toBe(true);
    expect(CouponStatusVO.active().canTransitionTo('disabled')).toBe(true);
    expect(CouponStatusVO.create('inactive').canTransitionTo('active')).toBe(true);
    expect(CouponStatusVO.create('expired').canTransitionTo('active')).toBe(false);
    expect(CouponStatusVO.create('scheduled').canTransitionTo('active')).toBe(true);
    expect(CouponStatusVO.create('exhausted').canTransitionTo('active')).toBe(false);
    expect(CouponStatusVO.create('disabled').canTransitionTo('active')).toBe(true);
  });

  it('GuestCartStatusVO state machine edges', () => {
    expect(GuestCartStatusVO.active().canTransitionTo('expired')).toBe(true);
    expect(GuestCartStatusVO.active().canTransitionTo('merged')).toBe(true);
    expect(GuestCartStatusVO.active().canTransitionTo('abandoned')).toBe(true);
    expect(GuestCartStatusVO.create('abandoned').canTransitionTo('merged')).toBe(true);
    expect(GuestCartStatusVO.create('abandoned').canTransitionTo('expired')).toBe(true);
    expect(GuestCartStatusVO.create('expired').canTransitionTo('active')).toBe(false);
    expect(GuestCartStatusVO.create('merged').canTransitionTo('active')).toBe(false);
  });

  it('CartItemStatusVO state machine edges', () => {
    expect(CartItemStatusVO.create('out_of_stock').canTransitionTo('active')).toBe(true);
    expect(CartItemStatusVO.create('out_of_stock').canTransitionTo('unavailable')).toBe(true);
    expect(CartItemStatusVO.create('out_of_stock').canTransitionTo('removed')).toBe(true);
    expect(CartItemStatusVO.create('unavailable').canTransitionTo('active')).toBe(true);
    expect(CartItemStatusVO.create('saved').canTransitionTo('active')).toBe(true);
    expect(CartItemStatusVO.create('saved').canTransitionTo('removed')).toBe(true);
    expect(CartItemStatusVO.create('removed').canTransitionTo('saved')).toBe(false);
  });

  it('CartStatusVO state machine — inactive transitions', () => {
    expect(CartStatusVO.create('inactive').canTransitionTo('active')).toBe(true);
    expect(CartStatusVO.create('inactive').canTransitionTo('expired')).toBe(true);
    expect(CartStatusVO.create('inactive').canTransitionTo('cleared')).toBe(true);
    expect(CartStatusVO.abandoned().canTransitionTo('active')).toBe(true);
    expect(CartStatusVO.abandoned().canTransitionTo('converted')).toBe(true);
    expect(CartStatusVO.abandoned().canTransitionTo('expired')).toBe(true);
    expect(CartStatusVO.abandoned().canTransitionTo('cleared')).toBe(true);
    expect(CartStatusVO.create('expired').canTransitionTo('cleared')).toBe(true);
    expect(CartStatusVO.create('merged').canTransitionTo('cleared')).toBe(true);
    expect(CartStatusVO.converted().canTransitionTo('cleared')).toBe(true);
  });

  it('CartShippingMethodVO predicates complete', () => {
    expect(CartShippingMethodVO.create('express').isExpress()).toBe(true);
    expect(CartShippingMethodVO.create('same_day').isSameDay()).toBe(true);
    expect(CartShippingMethodVO.create('international').isInternational()).toBe(true);
    expect(CartShippingMethodVO.create('pickup').isFreeEligible()).toBe(true);
    expect(CartShippingMethodVO.create('express').isFreeEligible()).toBe(false);
    expect(CartShippingMethodVO.reconstitute('express').value).toBe('express');
  });
});
