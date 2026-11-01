/**
 * PaymentCurrencyVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PaymentCurrencyVO', () => {
  describe('create()', () => {
    it('creates valid currency', () => {
      const vo = PaymentCurrencyVO.create('BDT');
      expect(vo.value).toBe('BDT');
    });

    it('uppercases', () => {
      expect(PaymentCurrencyVO.create('bdt').value).toBe('BDT');
      expect(PaymentCurrencyVO.create('usd').value).toBe('USD');
    });

    it('trims', () => {
      expect(PaymentCurrencyVO.create('  BDT  ').value).toBe('BDT');
    });

    it('throws on non-3-letter', () => {
      expect(() => PaymentCurrencyVO.create('BD')).toThrow(ValidationError);
      expect(() => PaymentCurrencyVO.create('BDTT')).toThrow(ValidationError);
    });

    it('throws on unsupported currency', () => {
      expect(() => PaymentCurrencyVO.create('XYZ')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => PaymentCurrencyVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = PaymentCurrencyVO.reconstitute('XYZ');
      expect(vo.value).toBe('XYZ');
    });
  });

  describe('factory helpers', () => {
    it('bdt()', () => expect(PaymentCurrencyVO.bdt().value).toBe('BDT'));
    it('usd()', () => expect(PaymentCurrencyVO.usd().value).toBe('USD'));
  });

  describe('predicates', () => {
    it('isBdt', () => {
      expect(PaymentCurrencyVO.bdt().isBdt()).toBe(true);
      expect(PaymentCurrencyVO.usd().isBdt()).toBe(false);
    });
    it('isUsd', () => {
      expect(PaymentCurrencyVO.usd().isUsd()).toBe(true);
      expect(PaymentCurrencyVO.bdt().isUsd()).toBe(false);
    });
  });
});
