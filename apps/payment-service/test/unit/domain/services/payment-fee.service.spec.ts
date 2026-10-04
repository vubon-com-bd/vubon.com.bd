import { PaymentFeeService } from '../../../../src/module/domain/services/payment-fee.service.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';

describe('PaymentFeeService', () => {
  describe('calculate()', () => {
    it('bkash fee — 1.85% + VAT 15%', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create('bkash'),
      });
      // bkash fee = 18.50; VAT = 2.775 → 2.78; total ≈ 21.28
      expect(r.gatewayFee).toBeCloseTo(18.5, 2);
      expect(r.vat).toBeCloseTo(2.78, 2);
      expect(r.totalFee).toBeCloseTo(21.28, 2);
      expect(r.netAmount).toBeCloseTo(978.72, 2);
      expect(r.currency).toBe('BDT');
    });

    it('nagad fee — 1.5%', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create('nagad'),
      });
      expect(r.gatewayFee).toBeCloseTo(15, 2);
    });

    it('rocket fee — 1.8%', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create('rocket'),
      });
      expect(r.gatewayFee).toBeCloseTo(18, 2);
    });

    it('sslcommerz BDT — 2.5%', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create('sslcommerz'),
      });
      expect(r.gatewayFee).toBeCloseTo(25, 2);
    });

    it('sslcommerz non-BDT — 3.5%', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'USD',
        gateway: PaymentGatewayVO.create('sslcommerz'),
      });
      expect(r.gatewayFee).toBeCloseTo(35, 2);
    });

    it('stripe fee — 2.9% + fixed', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'USD',
        gateway: PaymentGatewayVO.create('stripe'),
      });
      // 29 + 0.30 = 29.30
      expect(r.gatewayFee).toBeCloseTo(29.3, 2);
    });

    it('paypal fee — 3.49% + fixed', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'USD',
        gateway: PaymentGatewayVO.create('paypal'),
      });
      // 34.9 + 0.49 = 35.39
      expect(r.gatewayFee).toBeCloseTo(35.39, 2);
    });

    it('manual → zero fee', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create('manual'),
      });
      expect(r.gatewayFee).toBe(0);
      expect(r.vat).toBe(0);
      expect(r.totalFee).toBe(0);
      expect(r.netAmount).toBe(1000);
    });

    it('no gateway → zero fee', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: null,
      });
      expect(r.totalFee).toBe(0);
    });

    it('USD is VAT-exempt (vatRate = 0)', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'USD',
        gateway: PaymentGatewayVO.create('stripe'),
      });
      expect(r.vatRate).toBe(0);
      expect(r.vat).toBe(0);
    });

    it('BDT has VAT 15%', () => {
      const r = PaymentFeeService.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create('bkash'),
      });
      expect(r.vatRate).toBe(0.15);
    });
  });
});
