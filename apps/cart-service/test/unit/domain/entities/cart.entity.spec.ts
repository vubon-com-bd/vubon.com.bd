/**
 * CartEntity unit tests — aggregate root
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartCreatedEvent } from '@domain/events/cart.events.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CartEntity', () => {
  describe('create()', () => {
    it('creates an active cart with zero totals', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      expect(cart.id).toBe(TEST_IDS.CART_ID);
      expect(cart.isActive()).toBe(true);
      expect(cart.itemCount).toBe(0);
      expect(cart.total).toBe(0);
      expect(cart.version).toBe(1);
    });

    it('emits CartCreatedEvent', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      const events = cart.domainEvents;
      expect(events.length).toBeGreaterThanOrEqual(1);
      expect(events.some((e) => e instanceof CartCreatedEvent)).toBe(true);
    });
  });

  describe('state transitions', () => {
    let cart: CartEntity;

    beforeEach(() => {
      cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });
    });

    it('activate() is idempotent on active cart', () => {
      cart.activate(TEST_DATES.NOW);
      expect(cart.isActive()).toBe(true);
    });

    it('deactivate() moves to inactive', () => {
      cart.deactivate(TEST_DATES.NOW);
      expect(cart.isInactive()).toBe(true);
    });

    it('abandon() throws on empty cart', () => {
      expect(() => cart.abandon(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('abandon() on non-empty cart succeeds', () => {
      // Simulate having items
      cart.applyItemCountDelta(1, TEST_DATES.NOW);
      cart.abandon(TEST_DATES.NOW);
      expect(cart.isAbandoned()).toBe(true);
    });

    it('convert() requires active + non-empty', () => {
      expect(() => cart.convert('order-1', TEST_DATES.NOW)).toThrow(BusinessRuleError);
      cart.applyItemCountDelta(1, TEST_DATES.NOW);
      cart.convert('order-1', TEST_DATES.NOW);
      expect(cart.isConverted()).toBe(true);
    });

    it('expire() moves to expired', () => {
      cart.expire(TEST_DATES.NOW);
      expect(cart.isExpired()).toBe(true);
    });

    it('expire() is no-op on final status', () => {
      cart.expire(TEST_DATES.NOW);
      const v = cart.version;
      cart.expire(TEST_DATES.NOW);
      expect(cart.version).toBe(v);
    });

    it('markMerged() moves to merged', () => {
      cart.markMerged(TEST_IDS.CART_ID_2, TEST_DATES.NOW);
      expect(cart.isMerged()).toBe(true);
    });

    it('clear() resets state and moves to cleared', () => {
      cart.applyItemCountDelta(2, TEST_DATES.NOW);
      cart.updateTotals(
        { subtotal: 100, discount: 0, tax: 0, shipping: 0 },
        TEST_DATES.NOW,
      );
      cart.clear(TEST_DATES.NOW);
      expect(cart.isCleared()).toBe(true);
      expect(cart.itemCount).toBe(0);
      expect(cart.total).toBe(0);
    });
  });

  describe('updateTotals()', () => {
    it('computes correct total', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      cart.updateTotals(
        { subtotal: 200, discount: 20, tax: 30, shipping: 10 },
        TEST_DATES.NOW,
      );

      expect(cart.subtotal).toBe(200);
      expect(cart.discountAmount).toBe(20);
      expect(cart.taxAmount).toBe(30);
      expect(cart.shippingAmount).toBe(10);
      expect(cart.total).toBe(220);
    });

    it('throws if total would go negative', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      expect(() =>
        cart.updateTotals(
          { subtotal: 10, discount: 100, tax: 0, shipping: 0 },
          TEST_DATES.NOW,
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('applyItemCountDelta()', () => {
    it('increments item count', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      cart.applyItemCountDelta(5, TEST_DATES.NOW);
      expect(cart.itemCount).toBe(5);

      cart.applyItemCountDelta(-2, TEST_DATES.NOW);
      expect(cart.itemCount).toBe(3);
    });

    it('throws if count goes below zero', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      expect(() => cart.applyItemCountDelta(-1, TEST_DATES.NOW)).toThrow(
        ValidationError,
      );
    });

    it('throws if count exceeds 100', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      expect(() => cart.applyItemCountDelta(101, TEST_DATES.NOW)).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('isExpiredAt()', () => {
    it('returns true for past expiry', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.YESTERDAY,
        },
        now: TEST_DATES.NOW,
      });

      expect(cart.isExpiredAt(new Date(TEST_DATES.NOW))).toBe(true);
    });

    it('uses now by default', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.YESTERDAY,
        },
        now: TEST_DATES.NOW,
      });

      expect(cart.isExpiredAt()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds entity with same state', () => {
      const cart = CartEntity.reconstitute({
        id: TEST_IDS.CART_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        status: 'active',
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          itemCount: 3,
          subtotal: 300,
          discountAmount: 0,
          taxAmount: 0,
          shippingAmount: 0,
          total: 300,
          expiresAt: TEST_DATES.NEXT_MONTH,
          lastActivityAt: TEST_DATES.NOW,
        },
        version: 5,
      });

      expect(cart.itemCount).toBe(3);
      expect(cart.total).toBe(300);
      expect(cart.version).toBe(5);
      expect(cart.isActive()).toBe(true);
    });
  });

  describe('updateNotes()', () => {
    it('updates notes within limit', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      cart.updateNotes('Please gift wrap', TEST_DATES.NOW);
      expect(cart.notes).toBe('Please gift wrap');
    });

    it('throws on too-long notes', () => {
      const cart = CartEntity.create({
        id: CartIdVO.create(TEST_IDS.CART_ID),
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          currency: TEST_CURRENCY,
          expiresAt: TEST_DATES.NEXT_MONTH,
        },
        now: TEST_DATES.NOW,
      });

      expect(() => cart.updateNotes('x'.repeat(501), TEST_DATES.NOW)).toThrow(
        ValidationError,
      );
    });
  });
});
