/**
 * CartStatusVO — Unit Tests
 */
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CART_STATUS } from '@vubon/shared-constants/business/cart';

describe('CartStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid CART_STATUS value', () => {
      Object.values(CART_STATUS).forEach((s) => {
        const vo = CartStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => CartStatusVO.create('not-a-status')).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => CartStatusVO.create('')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CartStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('accepts value without validation', () => {
      const vo = CartStatusVO.reconstitute('custom-status');
      expect(vo.value).toBe('custom-status');
    });
  });

  describe('query methods', () => {
    it('isAbandoned() true only for abandoned', () => {
      expect(CartStatusVO.create(CART_STATUS.ABANDONED).isAbandoned()).toBe(true);
      expect(CartStatusVO.create(CART_STATUS.ACTIVE).isAbandoned()).toBe(false);
    });

    it('isConverted() true only for converted', () => {
      expect(CartStatusVO.create(CART_STATUS.CONVERTED).isConverted()).toBe(true);
      expect(CartStatusVO.create(CART_STATUS.ACTIVE).isConverted()).toBe(false);
    });

    it('isExpired() true only for expired', () => {
      expect(CartStatusVO.create(CART_STATUS.EXPIRED).isExpired()).toBe(true);
      expect(CartStatusVO.create(CART_STATUS.ACTIVE).isExpired()).toBe(false);
    });

    it('isMerged() true only for merged', () => {
      expect(CartStatusVO.create(CART_STATUS.MERGED).isMerged()).toBe(true);
    });

    it('isCleared() true only for cleared', () => {
      expect(CartStatusVO.create(CART_STATUS.CLEARED).isCleared()).toBe(true);
    });
  });

  describe('canTransitionTo()', () => {
    it('ACTIVE → ABANDONED allowed', () => {
      expect(
        CartStatusVO.create(CART_STATUS.ACTIVE).canTransitionTo(CART_STATUS.ABANDONED),
      ).toBe(true);
    });

    it('ACTIVE → CONVERTED allowed', () => {
      expect(
        CartStatusVO.create(CART_STATUS.ACTIVE).canTransitionTo(CART_STATUS.CONVERTED),
      ).toBe(true);
    });

    it('ABANDONED → ACTIVE not allowed', () => {
      expect(
        CartStatusVO.create(CART_STATUS.ABANDONED).canTransitionTo(CART_STATUS.ACTIVE),
      ).toBe(false);
    });

    it('unknown current status returns false', () => {
      expect(CartStatusVO.reconstitute('custom').canTransitionTo(CART_STATUS.ACTIVE)).toBe(false);
    });
  });
});
