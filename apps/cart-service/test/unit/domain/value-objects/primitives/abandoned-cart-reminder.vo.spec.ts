/**
 * AbandonedCartReminderVO — Unit Tests
 */
import { AbandonedCartReminderVO } from '../../../../../src/module/domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { ABANDONED_CART_REMINDER } from '@vubon/shared-constants/business/cart';

describe('AbandonedCartReminderVO', () => {
  describe('create()', () => {
    it('accepts each valid reminder type', () => {
      Object.values(ABANDONED_CART_REMINDER).forEach((r) => {
        const vo = AbandonedCartReminderVO.create(r);
        expect(vo.value).toBe(r);
      });
    });

    it('throws on invalid reminder type', () => {
      expect(() => AbandonedCartReminderVO.create('invalid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => AbandonedCartReminderVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = AbandonedCartReminderVO.reconstitute('custom');
      expect(vo.value).toBe('custom');
    });
  });

  describe('query methods', () => {
    it('isEmail() true only for email', () => {
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL).isEmail()).toBe(true);
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.SMS).isEmail()).toBe(false);
    });

    it('isSms() true only for sms', () => {
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.SMS).isSms()).toBe(true);
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL).isSms()).toBe(false);
    });

    it('isPush() true only for push', () => {
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.PUSH).isPush()).toBe(true);
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL).isPush()).toBe(false);
    });

    it('isMultiChannel() true only for multi', () => {
      expect(
        AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.MULTI).isMultiChannel(),
      ).toBe(true);
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL).isMultiChannel()).toBe(
        false,
      );
    });

    it('isDisabled() true only for none', () => {
      expect(
        AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.NONE).isDisabled(),
      ).toBe(true);
      expect(AbandonedCartReminderVO.create(ABANDONED_CART_REMINDER.EMAIL).isDisabled()).toBe(false);
    });
  });
});
