/**
 * FeeCalculatorService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { FeeCalculatorService } from '@infrastructure/services/internal/fee-calculator.service';

describe('FeeCalculatorService', () => {
  let service: FeeCalculatorService;

  beforeEach(() => {
    service = new FeeCalculatorService();
  });

  describe('calculate()', () => {
    it('calculates Stripe fee + VAT', () => {
      const result = service.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'stripe',
        method: 'card',
      });
      expect(result.grossAmount).toBe(1000);
      expect(result.platformFee).toBe(25); // 2.5%
      expect(result.vatAmount).toBe(3.75); // 15% of 25
      expect(result.netAmount).toBe(971.25);
    });

    it('calculates bKash fee + VAT', () => {
      const result = service.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'bkash',
        method: 'mobile_banking',
      });
      expect(result.platformFee).toBe(18); // 1.8%
      expect(result.netAmount).toBe(979.3);
    });

    it('exempts USD from VAT', () => {
      const result = service.calculate({
        amount: 100,
        currency: 'USD',
        provider: 'stripe',
        method: 'card',
      });
      expect(result.vatAmount).toBe(0);
      expect(result.vatRate).toBe(0);
    });

    it('COD uses flat fee 20 BDT', () => {
      const result = service.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'cod',
        method: 'cash_on_delivery',
      });
      expect(result.platformFee).toBe(20);
      expect(result.vatAmount).toBe(0);
      expect(result.netAmount).toBe(980);
    });

    it('COD caps fee at amount', () => {
      const result = service.calculate({
        amount: 10,
        currency: 'BDT',
        provider: 'cod',
        method: 'cash_on_delivery',
      });
      expect(result.platformFee).toBe(10);
      expect(result.netAmount).toBe(0);
    });

    it('falls back to default rate for unknown provider', () => {
      const result = service.calculate({
        amount: 1000,
        currency: 'BDT',
        provider: 'unknown',
        method: 'card',
      });
      expect(result.platformFee).toBe(25); // default 2.5%
    });
  });

  describe('platformFeeOnly()', () => {
    it('returns just the platform fee', () => {
      expect(service.platformFeeOnly(1000, 'stripe')).toBe(25);
      expect(service.platformFeeOnly(1000, 'bkash')).toBe(18);
      expect(service.platformFeeOnly(1000, 'unknown')).toBe(25);
    });
  });
});
