/**
 * AbandonedCartCompositeVO — Unit Tests
 */
import { AbandonedCartCompositeVO } from '../../../../../src/module/domain/value-objects/composites/abandoned-cart.vo.js';
import { AbandonedCartIdVO } from '../../../../../src/module/domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../../../../../src/module/domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import {
  ABANDONED_CART,
  ABANDONED_CART_STATUS,
  ABANDONED_CART_REMINDER,
} from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeProps(overrides = {}) {
  return {
    id: AbandonedCartIdVO.create(UUID),
    cartId: CartIdVO.create(UUID),
    status: AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING),
    reminderType: AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL),
    itemCount: 2,
    cartValue: 500,
    currency: 'BDT',
    abandonedAt: '2026-01-01T00:00:00Z',
    remindersSent: 0,
    ...overrides,
  };
}

describe('AbandonedCartCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = AbandonedCartCompositeVO.create(makeProps() as never);
      expect(vo.itemCount).toBe(2);
      expect(vo.cartValue).toBe(500);
    });

    it('throws on zero itemCount', () => {
      expect(() =>
        AbandonedCartCompositeVO.create(makeProps({ itemCount: 0 }) as never),
      ).toThrow();
    });

    it('throws on zero cartValue', () => {
      expect(() =>
        AbandonedCartCompositeVO.create(makeProps({ cartValue: 0 }) as never),
      ).toThrow();
    });

    it('throws on remindersSent > MAX', () => {
      expect(() =>
        AbandonedCartCompositeVO.create(
          makeProps({ remindersSent: ABANDONED_CART.MAX_REMINDERS + 1 }) as never,
        ),
      ).toThrow();
    });
  });

  describe('canSendAnotherReminder()', () => {
    it('true for pending with reminders left', () => {
      const vo = AbandonedCartCompositeVO.create(makeProps() as never);
      expect(vo.canSendAnotherReminder()).toBe(true);
    });

    it('false when max reminders reached', () => {
      const vo = AbandonedCartCompositeVO.create(
        makeProps({ remindersSent: ABANDONED_CART.MAX_REMINDERS }) as never,
      );
      expect(vo.canSendAnotherReminder()).toBe(false);
    });

    it('false when reminderType disabled', () => {
      const vo = AbandonedCartCompositeVO.create(
        makeProps({
          reminderType: AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.NONE),
        }) as never,
      );
      expect(vo.canSendAnotherReminder()).toBe(false);
    });
  });

  describe('hoursSinceAbandoned()', () => {
    it('computes hours since abandoned', () => {
      const vo = AbandonedCartCompositeVO.create(makeProps() as never);
      const now = new Date('2026-01-02T00:00:00Z');
      expect(vo.hoursSinceAbandoned(now)).toBe(24);
    });
  });

  describe('isRecovered()', () => {
    it('false for pending', () => {
      const vo = AbandonedCartCompositeVO.create(makeProps() as never);
      expect(vo.isRecovered()).toBe(false);
    });

    it('true for recovered', () => {
      const vo = AbandonedCartCompositeVO.create(
        makeProps({
          status: AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.RECOVERED),
        }) as never,
      );
      expect(vo.isRecovered()).toBe(true);
    });
  });
});
