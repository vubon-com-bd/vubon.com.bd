/**
 * PaymentAmountVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PaymentAmountVO', () => {
  describe('create()', () => {
    it('creates valid amount', () => {
      const vo = PaymentAmountVO.create(100, 'BDT');
      expect(vo.amount).toBe(100);
      expect(vo.currency).toBe('BDT');
    });

    it('uppercases currency', () => {
      expect(PaymentAmountVO.create(100, 'bdt').currency).toBe('BDT');
    });

    it('rounds to 2 decimals', () => {
      expect(PaymentAmountVO.create(100.126, 'BDT').amount).toBe(100.13);
      expect(PaymentAmountVO.create(100.124, 'BDT').amount).toBe(100.12);
    });

    it('throws on below minimum', () => {
      expect(() => PaymentAmountVO.create(0, 'BDT')).toThrow(ValidationError);
    });

    it('throws on above maximum', () => {
      expect(() =>
        PaymentAmountVO.create(PAYMENT_LIMIT.MAX_AMOUNT + 1, 'BDT'),
      ).toThrow(ValidationError);
    });

    it('throws on NaN', () => {
      expect(() => PaymentAmountVO.create(NaN, 'BDT')).toThrow(ValidationError);
    });

    it('throws on Infinity', () => {
      expect(() => PaymentAmountVO.create(Infinity, 'BDT')).toThrow(ValidationError);
    });

    it('throws on empty currency', () => {
      expect(() => PaymentAmountVO.create(100, '')).toThrow(ValidationError);
    });

    it('throws on whitespace currency', () => {
      expect(() => PaymentAmountVO.create(100, '   ')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves amount + currency', () => {
      const vo = PaymentAmountVO.reconstitute(99.999, 'BDT');
      expect(vo.amount).toBe(99.999);
      expect(vo.currency).toBe('BDT');
    });
  });

  describe('add()', () => {
    it('adds same currency', () => {
      const a = PaymentAmountVO.create(100, 'BDT');
      const b = PaymentAmountVO.create(50, 'BDT');
      expect(a.add(b).amount).toBe(150);
    });
    it('throws on currency mismatch', () => {
      const a = PaymentAmountVO.create(100, 'BDT');
      const b = PaymentAmountVO.create(50, 'USD');
      expect(() => a.add(b)).toThrow(ValidationError);
    });
  });

  describe('subtract()', () => {
    it('subtracts same currency', () => {
      const a = PaymentAmountVO.create(100, 'BDT');
      const b = PaymentAmountVO.create(30, 'BDT');
      expect(a.subtract(b).amount).toBe(70);
    });
    it('throws on currency mismatch', () => {
      const a = PaymentAmountVO.create(100, 'BDT');
      const b = PaymentAmountVO.create(30, 'USD');
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });
    it('throws if result goes below minimum', () => {
      const a = PaymentAmountVO.create(10, 'BDT');
      const b = PaymentAmountVO.create(100, 'BDT');
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });
  });

  describe('multiply()', () => {
    it('multiplies by factor', () => {
      const vo = PaymentAmountVO.create(100, 'BDT');
      expect(vo.multiply(1.5).amount).toBe(150);
    });
    it('throws on negative factor', () => {
      const vo = PaymentAmountVO.create(100, 'BDT');
      expect(() => vo.multiply(-1)).toThrow(ValidationError);
    });
    it('throws on non-finite factor', () => {
      const vo = PaymentAmountVO.create(100, 'BDT');
      expect(() => vo.multiply(NaN)).toThrow(ValidationError);
    });
  });

  describe('isZero / isPositive', () => {
    it('isZero false when > 0', () => {
      expect(PaymentAmountVO.create(1, 'BDT').isZero()).toBe(false);
    });
    it('isPositive true', () => {
      expect(PaymentAmountVO.create(1, 'BDT').isPositive()).toBe(true);
    });
  });
});
