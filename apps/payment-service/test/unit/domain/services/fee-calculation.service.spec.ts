/**
 * FeeCalculationService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { FeeCalculationService } from '@domain/services/fee-calculation.service';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('FeeCalculationService', () => {
  describe('calculate() — card via stripe (BDT)', () => {
    it('applies 2.5% fee + 15% VAT', () => {
      const r = FeeCalculationService.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'stripe',
        method: 'card',
      });
      expect(r.grossAmount).toBe(1000);
      expect(r.platformFee).toBe(25);          // 1000 * 0.025
      expect(r.vatAmount).toBe(3.75);          // 25 * 0.15
      expect(r.netAmount).toBe(971.25);        // 1000 - 25 - 3.75
      expect(r.vatRate).toBe(0.15);
      expect(r.feeRate).toBe(0.025);
    });
  });

  describe('calculate() — VAT exempt currencies', () => {
    it('USD: no VAT', () => {
      const r = FeeCalculationService.calculate({
        amount: 100,
        currency: 'USD',
        provider: 'stripe',
        method: 'card',
      });
      expect(r.vatAmount).toBe(0);
      expect(r.vatRate).toBe(0);
    });
    it('EUR: no VAT', () => {
      const r = FeeCalculationService.calculate({
        amount: 100,
        currency: 'EUR',
        provider: 'stripe',
        method: 'card',
      });
      expect(r.vatAmount).toBe(0);
    });
    it('GBP: no VAT', () => {
      const r = FeeCalculationService.calculate({
        amount: 100,
        currency: 'GBP',
        provider: 'stripe',
        method: 'card',
      });
      expect(r.vatAmount).toBe(0);
    });
    it('JPY: no VAT', () => {
      const r = FeeCalculationService.calculate({
        amount: 100,
        currency: 'JPY',
        provider: 'stripe',
        method: 'card',
      });
      expect(r.vatAmount).toBe(0);
    });
  });

  describe('calculate() — COD', () => {
    it('flat 20 BDT fee, no VAT', () => {
      const r = FeeCalculationService.calculate({
        amount: 500,
        currency: 'BDT',
        provider: 'manual',
        method: 'cash_on_delivery',
      });
      expect(r.platformFee).toBe(20);
      expect(r.vatAmount).toBe(0);
      expect(r.netAmount).toBe(480);
    });
    it('caps COD fee when amount < 20', () => {
      const r = FeeCalculationService.calculate({
        amount: 10,
        currency: 'BDT',
        provider: 'manual',
        method: 'cash_on_delivery',
      });
      expect(r.platformFee).toBe(10);
      expect(r.netAmount).toBe(0);
    });
  });

  describe('calculate() — bkash / nagad', () => {
    it('bkash: 1.8% fee', () => {
      const r = FeeCalculationService.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'bkash',
        method: 'mobile_banking',
      });
      expect(r.platformFee).toBe(18);
    });
    it('nagad: 1.5% fee', () => {
      const r = FeeCalculationService.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'nagad',
        method: 'mobile_banking',
      });
      expect(r.platformFee).toBe(15);
    });
  });

  describe('calculate() — validation', () => {
    it('throws on negative amount', () => {
      expect(() =>
        FeeCalculationService.calculate({
          amount: -1,
          currency: 'BDT',
          provider: 'stripe',
          method: 'card',
        }),
      ).toThrow(ValidationError);
    });
    it('throws on NaN', () => {
      expect(() =>
        FeeCalculationService.calculate({
          amount: NaN,
          currency: 'BDT',
          provider: 'stripe',
          method: 'card',
        }),
      ).toThrow(ValidationError);
    });
    it('zero amount returns zero fees', () => {
      const r = FeeCalculationService.calculate({
        amount: 0,
        currency: 'BDT',
        provider: 'stripe',
        method: 'card',
      });
      expect(r.platformFee).toBe(0);
      expect(r.netAmount).toBe(0);
    });
  });

  describe('platformFeeOf()', () => {
    it('returns fee without VAT', () => {
      expect(FeeCalculationService.platformFeeOf(1000, 'stripe')).toBe(25);
    });
    it('fallback 2.5% for unknown provider', () => {
      expect(FeeCalculationService.platformFeeOf(1000, 'unknown')).toBe(25);
    });
  });
});
