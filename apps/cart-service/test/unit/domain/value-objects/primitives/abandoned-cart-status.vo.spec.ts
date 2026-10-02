/**
 * AbandonedCartStatusVO — Unit Tests
 */
import { AbandonedCartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { ABANDONED_CART_STATUS } from '@vubon/shared-constants/business/cart';

describe('AbandonedCartStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid status', () => {
      Object.values(ABANDONED_CART_STATUS).forEach((s) => {
        const vo = AbandonedCartStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => AbandonedCartStatusVO.create('invalid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => AbandonedCartStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = AbandonedCartStatusVO.reconstitute('custom');
      expect(vo.value).toBe('custom');
    });
  });

  describe('query methods', () => {
    it('isPending() true only for pending', () => {
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING).isPending()).toBe(true);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.RECOVERED).isPending()).toBe(false);
    });

    it('isReminded() true only for reminded', () => {
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.REMINDED).isReminded()).toBe(true);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING).isReminded()).toBe(false);
    });

    it('isRecovered() true only for recovered', () => {
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.RECOVERED).isRecovered(),
      ).toBe(true);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING).isRecovered()).toBe(false);
    });

    it('isLost() true only for lost', () => {
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.LOST).isLost()).toBe(true);
    });

    it('isUnsubscribed() true only for unsubscribed', () => {
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.UNSUBSCRIBED).isUnsubscribed(),
      ).toBe(true);
    });

    it('isFinal() true for recovered, lost, unsubscribed', () => {
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.RECOVERED).isFinal(),
      ).toBe(true);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.LOST).isFinal()).toBe(true);
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.UNSUBSCRIBED).isFinal(),
      ).toBe(true);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING).isFinal()).toBe(false);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.REMINDED).isFinal()).toBe(false);
    });

    it('canSendReminder() true for pending and reminded only', () => {
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.PENDING).canSendReminder(),
      ).toBe(true);
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.REMINDED).canSendReminder(),
      ).toBe(true);
      expect(
        AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.RECOVERED).canSendReminder(),
      ).toBe(false);
      expect(AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.LOST).canSendReminder()).toBe(
        false,
      );
    });
  });
});
