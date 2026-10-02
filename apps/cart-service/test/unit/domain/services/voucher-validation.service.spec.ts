/**
 * VoucherValidationService — Unit Tests
 */
import { VoucherValidationService } from '../../../../src/module/domain/services/voucher-validation.service.js';
import { CartVoucherCompositeVO } from '../../../../src/module/domain/value-objects/composites/cart-voucher.vo.js';
import { VoucherCodeVO } from '../../../../src/module/domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../src/module/domain/value-objects/primitives/voucher-status.vo.js';
import { VOUCHER_STATUS } from '@vubon/shared-constants/business/cart';

function makeVoucher(overrides = {}) {
  return CartVoucherCompositeVO.create({
    code: VoucherCodeVO.create('GC-ABCD1234'),
    status: VoucherStatusVO.create(VOUCHER_STATUS.ACTIVE),
    initialAmount: 1000,
    remainingAmount: 1000,
    currency: 'BDT',
    expiresAt: '2099-12-31T23:59:59Z',
    partialRedeemAllowed: true,
    ...overrides,
  });
}

describe('VoucherValidationService', () => {
  const svc = new VoucherValidationService();

  describe('validate()', () => {
    it('valid for active voucher with correct currency', () => {
      const r = svc.validate(makeVoucher(), { orderTotal: 500, currency: 'BDT' });
      expect(r.valid).toBe(true);
      expect(r.redeemableAmount).toBe(500);
    });

    it('invalid when status not usable', () => {
      const r = svc.validate(
        makeVoucher({ status: VoucherStatusVO.create(VOUCHER_STATUS.REDEEMED) }),
        { orderTotal: 500, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('VOUCHER_NOT_ACTIVE');
    });

    it('invalid when expired', () => {
      const r = svc.validate(
        makeVoucher({ expiresAt: '2020-01-01T00:00:00Z' }),
        { orderTotal: 500, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('VOUCHER_EXPIRED');
    });

    it('invalid on currency mismatch', () => {
      const r = svc.validate(makeVoucher(), { orderTotal: 500, currency: 'USD' });
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('VOUCHER_CURRENCY_MISMATCH');
    });

    it('invalid when redeemable amount is zero', () => {
      const r = svc.validate(makeVoucher({ remainingAmount: 0 }), {
        orderTotal: 500,
        currency: 'BDT',
      });
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('VOUCHER_ZERO_REDEEM');
    });
  });

  describe('remainingAfter()', () => {
    it('subtracts applied amount from remaining', () => {
      const v = makeVoucher({ remainingAmount: 1000 });
      // applying 500 → remaining 500
      expect(svc.remainingAfter(v, 500)).toBe(500);
    });

    it('caps at remaining when order exceeds', () => {
      const v = makeVoucher({ remainingAmount: 500 });
      expect(svc.remainingAfter(v, 1000)).toBe(0);
    });
  });

  describe('fullyCovers()', () => {
    it('true when remaining >= orderTotal and usable', () => {
      const v = makeVoucher({ remainingAmount: 1000 });
      expect(svc.fullyCovers(v, 500)).toBe(true);
    });

    it('false when remaining < orderTotal', () => {
      const v = makeVoucher({ remainingAmount: 100 });
      expect(svc.fullyCovers(v, 500)).toBe(false);
    });
  });
});
