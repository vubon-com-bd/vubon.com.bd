/**
 * GuestCartStatusVO — Unit Tests
 */
import { GuestCartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

describe('GuestCartStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid GUEST_CART_STATUS value', () => {
      Object.values(GUEST_CART_STATUS).forEach((s) => {
        const vo = GuestCartStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => GuestCartStatusVO.create('invalid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => GuestCartStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = GuestCartStatusVO.reconstitute('custom');
      expect(vo.value).toBe('custom');
    });
  });

  describe('query methods', () => {
    it('isActive() true only for active', () => {
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE).isActive()).toBe(true);
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED).isActive()).toBe(false);
    });

    it('isMerged() true only for merged', () => {
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED).isMerged()).toBe(true);
    });

    it('isExpired() true only for expired', () => {
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.EXPIRED).isExpired()).toBe(true);
    });

    it('isAbandoned() true only for abandoned', () => {
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.ABANDONED).isAbandoned()).toBe(true);
    });

    it('canBeMerged() true only for active', () => {
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE).canBeMerged()).toBe(true);
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED).canBeMerged()).toBe(false);
      expect(GuestCartStatusVO.create(GUEST_CART_STATUS.EXPIRED).canBeMerged()).toBe(false);
    });
  });
});
