import { jest } from '@jest/globals';
import { FeeCalculatorService } from '../../../../src/module/infrastructure/services/internal/fee-calculator.service.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';

describe('FeeCalculatorService', () => {
  let service: FeeCalculatorService;

  beforeEach(() => {
    service = new FeeCalculatorService();
  });

  it('delegates to PaymentFeeService — bkash', () => {
    const r = service.calculate({
      amount: 1000,
      currency: 'BDT',
      gateway: PaymentGatewayVO.create('bkash'),
    });
    expect(r.gatewayFee).toBeCloseTo(18.5, 2);
    expect(r.vat).toBeCloseTo(2.78, 2);
  });

  it('handles null gateway', () => {
    const r = service.calculate({
      amount: 1000,
      currency: 'BDT',
      gateway: null,
    });
    expect(r.gatewayFee).toBe(0);
  });

  it('handles undefined gateway', () => {
    const r = service.calculate({ amount: 1000, currency: 'BDT' });
    expect(r.totalFee).toBe(0);
    expect(r.netAmount).toBe(1000);
  });
});
