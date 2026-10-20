import { describe, it, expect, beforeEach } from '@jest/globals';
import { FeeCalculatorService } from '@infrastructure/services/internal/fee-calculator.service';

describe('FeeCalculatorService', () => {
  let service: FeeCalculatorService;

  beforeEach(() => {
    service = new FeeCalculatorService();
  });

  it('calculates default gateway fee (2%) + 15% VAT', () => {
    const result = service.calculate({
      amount: 1000,
      currency: 'BDT',
    });
    expect(result.grossAmount).toBe(1000);
    expect(result.gatewayFee).toBe(20); // 2%
    expect(result.vat).toBe(3); // 15% of 20
    expect(result.totalFee).toBe(23);
    expect(result.netAmount).toBe(977);
    expect(result.currency).toBe('BDT');
  });

  it('uses bkash specific rate (1.85%)', () => {
    const result = service.calculate({
      amount: 1000,
      currency: 'BDT',
      gateway: 'bkash',
    });
    expect(result.gatewayFee).toBe(18.5);
    expect(result.vat).toBeCloseTo(2.78, 2);
  });

  it('uses nagad rate (1.5%)', () => {
    const result = service.calculate({
      amount: 1000,
      currency: 'BDT',
      gateway: 'nagad',
    });
    expect(result.gatewayFee).toBe(15);
  });

  it('uses stripe rate (2.9%)', () => {
    const result = service.calculate({
      amount: 100,
      currency: 'USD',
      gateway: 'stripe',
    });
    expect(result.gatewayFee).toBeCloseTo(2.9, 2);
    expect(result.currency).toBe('USD');
  });

  it('rounds to 2 decimals', () => {
    const result = service.calculate({
      amount: 33.33,
      currency: 'BDT',
    });
    expect(result.gatewayFee).toBe(0.67);
  });

  it('handles unknown gateway (default 2%)', () => {
    const result = service.calculate({
      amount: 500,
      currency: 'BDT',
      gateway: 'unknown-gateway',
    });
    expect(result.gatewayFee).toBe(10);
  });
});
