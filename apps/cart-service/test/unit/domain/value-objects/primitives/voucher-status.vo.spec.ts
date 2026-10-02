/**
 * VoucherStatusVO — Unit Tests
 */
import { VoucherStatusVO } from '../../../../../src/module/domain/value-objects/primitives/voucher-status.vo.js';
import { VOUCHER_STATUS } from '@vubon/shared-constants/business/cart';

describe('VoucherStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid VOUCHER_STATUS value', () => {
      Object.values(VOUCHER_STATUS).forEach((s) => {
        const vo = VoucherStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => VoucherStatusVO.create('not-a-status')).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => VoucherStatusVO.create('')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => VoucherStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('accepts any string without validation', () => {
      const vo = VoucherStatusVO.reconstitute('custom-status');
      expect(vo.value).toBe('custom-status');
    });
  });

  describe('query methods', () => {
    it('isUsable() true only for active', () => {
      expect(VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE).isUsable()).toBe(true);
      expect(VoucherStatusVO.create(VOUCHER_STATUS.REDEEMED).isUsable()).toBe(false);
    });

    it('isRedeemed() true only for redeemed', () => {
      expect(VoucherStatusVO.create(VOUCHER_STATUS.REDEEMED).isRedeemed()).toBe(true);
      expect(VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE).isRedeemed()).toBe(false);
    });

    it('isExpired() true only for expired', () => {
      expect(VoucherStatusVO.create(VOUCHER_STATUS.EXPIRED).isExpired()).toBe(true);
      expect(VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE).isExpired()).toBe(false);
    });

    it('isCancelled() true only for cancelled', () => {
      expect(VoucherStatusVO.create(VOUCHER_STATUS.CANCELLED).isCancelled()).toBe(true);
      expect(VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE).isCancelled()).toBe(false);
    });

    it('isScheduled() true only for scheduled', () => {
      expect(VoucherStatusVO.create(VOUCHER_STATUS.SCHEDULED).isScheduled()).toBe(true);
      expect(VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE).isScheduled()).toBe(false);
    });
  });

  describe('equals()', () => {
    it('true for equal statuses', () => {
      const a = VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE);
      const b = VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE);
      expect(a.equals(b)).toBe(true);
    });

    it('false for different statuses', () => {
      const a = VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE);
      const b = VoucherStatusVO.create(VOUCHER_STATUS.EXPIRED);
      expect(a.equals(b)).toBe(false);
    });
  });
});
