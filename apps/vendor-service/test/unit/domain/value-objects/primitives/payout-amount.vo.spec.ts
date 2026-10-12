import { PayoutAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PayoutAmountVO', () => {
  describe('create()', () => {
    it('creates valid amount', () => {
      const vo = PayoutAmountVO.create(5000, 'BDT');
      expect(vo.amount).toBe(5000);
      expect(vo.currency).toBe('BDT');
    });

    it('throws on below minimum', () => {
      expect(() => PayoutAmountVO.create(50, 'BDT')).toThrow(ValidationError);
    });

    it('throws on above maximum', () => {
      expect(() => PayoutAmountVO.create(99_999_999, 'BDT')).toThrow(ValidationError);
    });

    it('throws on invalid currency', () => {
      expect(() => PayoutAmountVO.create(5000, 'AB')).toThrow(ValidationError);
    });
  });

  describe('minimum()', () => {
    it('creates minimum payout', () => {
      const vo = PayoutAmountVO.minimum('BDT');
      expect(vo.amount).toBeGreaterThan(0);
    });
  });

  describe('add()', () => {
    it('adds same currency', () => {
      const a = PayoutAmountVO.create(1000, 'BDT');
      const b = PayoutAmountVO.create(500, 'BDT');
      expect(a.add(b).amount).toBe(1500);
    });

    it('throws on currency mismatch', () => {
      const a = PayoutAmountVO.create(1000, 'BDT');
      const b = PayoutAmountVO.create(500, 'USD');
      expect(() => a.add(b)).toThrow(ValidationError);
    });
  });

  describe('subtractFee()', () => {
    it('subtracts fee and keeps above min', () => {
      const vo = PayoutAmountVO.create(1000, 'BDT');
      expect(vo.subtractFee(50).amount).toBe(950);
    });

    it('throws when net below min', () => {
      const vo = PayoutAmountVO.create(150, 'BDT');
      expect(() => vo.subtractFee(140)).toThrow(ValidationError);
    });

    it('throws on negative fee', () => {
      const vo = PayoutAmountVO.create(1000, 'BDT');
      expect(() => vo.subtractFee(-10)).toThrow(ValidationError);
    });
  });

  describe('isAtMinimum()', () => {
    it('true when equals min', () => {
      expect(PayoutAmountVO.minimum('BDT').isAtMinimum()).toBe(true);
    });
  });
});
