/**
 * CanRecoverSpecification — Unit Tests
 */
import { CanRecoverSpecification } from '../../../../src/module/domain/specifications/can-recover.specification.js';
import { AbandonedCartEntity } from '../../../../src/module/domain/entities/abandoned-cart.entity.js';
import { AbandonedCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import {
  ABANDONED_CART,
  ABANDONED_CART_STATUS,
  ABANDONED_CART_REMINDER,
} from '@vubon/shared-constants/business/cart';

const P = '11111111-1111-1111-1111-111111111111';
const NOW = '2026-01-01T00:00:00Z';

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

function makeAbandoned(opts: { status?: string; abandonedAt?: string } = {}) {
  return AbandonedCartEntity.create({
    id: P,
    now: NOW,
    props: {
      cartId: CartIdVO.create(P),
      status: AbandonedCartStatusVO.create(opts.status ?? ABANDONED_CART_STATUS.PENDING),
      reminderType: AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL),
      itemCount: 2,
      cartValue: 500,
      currency: 'BDT',
      abandonedAt: opts.abandonedAt ?? hoursAgo(24), // 1 day ago (recent)
      remindersSent: 0,
    },
  });
}

describe('CanRecoverSpecification', () => {
  const spec = new CanRecoverSpecification();

  describe('isSatisfiedBy()', () => {
    it('true for pending abandoned cart within window', () => {
      const r = spec.isSatisfiedBy({ abandonedCart: makeAbandoned() });
      expect(r).toBe(true);
    });

    it('false when already recovered', () => {
      const r = spec.isSatisfiedBy({
        abandonedCart: makeAbandoned({ status: ABANDONED_CART_STATUS.RECOVERED }),
      });
      expect(r).toBe(false);
    });

    it('false when marked lost', () => {
      const r = spec.isSatisfiedBy({
        abandonedCart: makeAbandoned({ status: ABANDONED_CART_STATUS.LOST }),
      });
      expect(r).toBe(false);
    });

    it('false when user unsubscribed', () => {
      const r = spec.isSatisfiedBy({
        abandonedCart: makeAbandoned({ status: ABANDONED_CART_STATUS.UNSUBSCRIBED }),
      });
      expect(r).toBe(false);
    });

    it('false when recovery window exceeded', () => {
      const oldDate = new Date(
        Date.now() - (ABANDONED_CART.EXPIRY_DAYS + 1) * 24 * 60 * 60 * 1000,
      ).toISOString();
      const r = spec.isSatisfiedBy({
        abandonedCart: makeAbandoned({ abandonedAt: oldDate }),
      });
      expect(r).toBe(false);
    });

    it('respects custom maxRecoveryWindowDays = 0', () => {
      const r = spec.isSatisfiedBy({
        abandonedCart: makeAbandoned({ abandonedAt: hoursAgo(2) }),
        ctx: { maxRecoveryWindowDays: 0 },
      });
      expect(r).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when recoverable', () => {
      expect(spec.explain({ abandonedCart: makeAbandoned() })).toBeNull();
    });

    it('"already recovered"', () => {
      const r = spec.explain({
        abandonedCart: makeAbandoned({ status: ABANDONED_CART_STATUS.RECOVERED }),
      });
      expect(r).toBe('already recovered');
    });

    it('"marked lost"', () => {
      const r = spec.explain({
        abandonedCart: makeAbandoned({ status: ABANDONED_CART_STATUS.LOST }),
      });
      expect(r).toBe('marked lost');
    });

    it('"user unsubscribed"', () => {
      const r = spec.explain({
        abandonedCart: makeAbandoned({ status: ABANDONED_CART_STATUS.UNSUBSCRIBED }),
      });
      expect(r).toBe('user unsubscribed');
    });
  });

  describe('daysRemaining()', () => {
    it('returns positive days for recent abandoned cart', () => {
      const r = spec.daysRemaining(makeAbandoned({ abandonedAt: hoursAgo(24) }));
      expect(r).toBeGreaterThan(0);
    });

    it('returns 0 for old cart beyond expiry window', () => {
      const oldDate = new Date(
        Date.now() - (ABANDONED_CART.EXPIRY_DAYS + 5) * 24 * 60 * 60 * 1000,
      ).toISOString();
      const r = spec.daysRemaining(makeAbandoned({ abandonedAt: oldDate }));
      expect(r).toBe(0);
    });
  });
});
