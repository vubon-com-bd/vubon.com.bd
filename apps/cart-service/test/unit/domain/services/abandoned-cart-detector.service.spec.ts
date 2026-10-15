/**
 * AbandonedCartDetectorService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AbandonedCartDetectorService } from '@domain/services/abandoned-cart-detector.service.js';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { TEST_IDS, TEST_CURRENCY } from '../../../fixtures/index';

describe('AbandonedCartDetectorService', () => {
  function makeStaleCart(idleHours: number, itemCount = 1) {
    const now = new Date();
    const lastActivity = new Date(now.getTime() - idleHours * 3600 * 1000);

    const cart = CartEntity.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        currency: TEST_CURRENCY,
        expiresAt: new Date(now.getTime() + 7 * 24 * 3600 * 1000).toISOString(),
      },
      now: lastActivity.toISOString(),
    });

    if (itemCount > 0) {
      cart.applyItemCountDelta(itemCount, lastActivity.toISOString());
    }
    return cart;
  }

  it('detects abandoned when idle hours exceed threshold', () => {
    const cart = makeStaleCart(30);
    const result = AbandonedCartDetectorService.evaluate(cart);
    expect(result.isAbandoned).toBe(true);
    expect(result.idleHours).toBeGreaterThanOrEqual(24);
  });

  it('does not abandon when idle < threshold', () => {
    const cart = makeStaleCart(5);
    const result = AbandonedCartDetectorService.evaluate(cart);
    expect(result.isAbandoned).toBe(false);
  });

  it('does not abandon if cart is final', () => {
    const cart = makeStaleCart(30);
    cart.expire();
    const result = AbandonedCartDetectorService.evaluate(cart);
    expect(result.isAbandoned).toBe(false);
  });

  it('does not abandon empty cart', () => {
    const cart = makeStaleCart(30, 0);
    const result = AbandonedCartDetectorService.evaluate(cart);
    expect(result.isAbandoned).toBe(false);
  });

  it('isAbandoned() convenience works', () => {
    const cart = makeStaleCart(30);
    expect(AbandonedCartDetectorService.isAbandoned(cart)).toBe(true);
  });

  it('respects custom config', () => {
    const cart = makeStaleCart(5);
    const result = AbandonedCartDetectorService.evaluate(cart, {
      thresholdHours: 3,
      minItemCount: 1,
      minCartValue: 0,
    });
    expect(result.isAbandoned).toBe(true);
  });
});
