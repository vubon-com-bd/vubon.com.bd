/**
 * CurrencyConversionService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CurrencyConversionService } from '@domain/services/currency-conversion.service';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const RATES = { USD: 110, EUR: 120, GBP: 140 };

describe('CurrencyConversionService', () => {
  describe('convert()', () => {
    it('same currency → no change', () => {
      const r = CurrencyConversionService.convert({
        amount: 100,
        from: 'BDT',
        to: 'BDT',
        rates: RATES,
      });
      expect(r).toBe(100);
    });

    it('BDT → USD (divide by rate)', () => {
      const r = CurrencyConversionService.convert({
        amount: 1100,
        from: 'BDT',
        to: 'USD',
        rates: RATES,
      });
      expect(r).toBe(10);
    });

    it('USD → BDT (multiply by rate)', () => {
      const r = CurrencyConversionService.convert({
        amount: 10,
        from: 'USD',
        to: 'BDT',
        rates: RATES,
      });
      expect(r).toBe(1100);
    });

    it('USD → EUR (via BDT base)', () => {
      // 100 USD = 11000 BDT / 120 = 91.67 EUR
      const r = CurrencyConversionService.convert({
        amount: 100,
        from: 'USD',
        to: 'EUR',
        rates: RATES,
      });
      expect(r).toBe(91.67);
    });

    it('throws on negative amount', () => {
      expect(() =>
        CurrencyConversionService.convert({
          amount: -10,
          from: 'USD',
          to: 'BDT',
          rates: RATES,
        }),
      ).toThrow(ValidationError);
    });

    it('throws on non-finite amount', () => {
      expect(() =>
        CurrencyConversionService.convert({
          amount: NaN,
          from: 'USD',
          to: 'BDT',
          rates: RATES,
        }),
      ).toThrow(ValidationError);
    });

    it('throws on missing rate', () => {
      expect(() =>
        CurrencyConversionService.convert({
          amount: 100,
          from: 'XYZ',
          to: 'BDT',
          rates: RATES,
        }),
      ).toThrow(ValidationError);
    });

    it('returns 0 for 0 amount', () => {
      const r = CurrencyConversionService.convert({
        amount: 0,
        from: 'USD',
        to: 'BDT',
        rates: RATES,
      });
      expect(r).toBe(0);
    });
  });

  describe('toBdt()', () => {
    it('converts USD → BDT', () => {
      expect(CurrencyConversionService.toBdt(10, 'USD', RATES)).toBe(1100);
    });
  });

  describe('fromBdt()', () => {
    it('converts BDT → USD', () => {
      expect(CurrencyConversionService.fromBdt(1100, 'USD', RATES)).toBe(10);
    });
  });
});
