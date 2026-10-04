import { PaymentGatewayRouterService } from '../../../../src/module/domain/services/payment-gateway-router.service.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { CurrencyVO } from '../../../../src/module/domain/value-objects/primitives/currency.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';

describe('PaymentGatewayRouterService', () => {
  it('cash_on_delivery → null gateway', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('cash_on_delivery'),
      currency: CurrencyVO.create('BDT'),
      amount: 1000,
    });
    expect(r.gateway).toBeNull();
    expect(r.reason).toContain('cash_on_delivery');
  });

  it('BDT + mobile_banking → local gateway (bkash/nagad/rocket)', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('mobile_banking'),
      currency: CurrencyVO.create('BDT'),
      amount: 1000,
    });
    expect(r.gateway).not.toBeNull();
    expect(['bkash', 'nagad', 'rocket']).toContain(r.gateway!.value);
  });

  it('BDT + card → sslcommerz / stripe / manual', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('card'),
      currency: CurrencyVO.create('BDT'),
      amount: 1000,
    });
    expect(['sslcommerz', 'stripe', 'manual']).toContain(r.gateway!.value);
  });

  it('USD + card → stripe (preferred)', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('card'),
      currency: CurrencyVO.create('USD'),
      amount: 100,
    });
    expect(r.gateway!.value).toBe('stripe');
  });

  it('EUR + mobile_banking → international fallback (no local BD gateway)', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('mobile_banking'),
      currency: CurrencyVO.create('EUR'),
      amount: 100,
    });
    // BKash/Nagad/Rocket don't support EUR, so router must fall back to
    // an international gateway that supports the method (stripe/sslcommerz/paypal).
    expect(r.gateway).not.toBeNull();
    expect(r.gateway!.supportsCurrency('EUR')).toBe(true);
  });

  it('preferred gateway wins if compatible', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('mobile_banking'),
      currency: CurrencyVO.create('BDT'),
      amount: 1000,
      preferredGateway: PaymentGatewayVO.create('nagad'),
    });
    expect(r.gateway!.value).toBe('nagad');
    expect(r.reason).toBe('preferred_gateway');
  });

  it('preferred gateway ignored when currency-incompatible (bkash + USD)', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('mobile_banking'),
      currency: CurrencyVO.create('USD'),
      amount: 100,
      preferredGateway: PaymentGatewayVO.create('bkash'),
    });
    // bkash doesn't support USD → fallback to something that does
    expect(r.gateway).not.toBeNull();
    expect(r.gateway!.value).not.toBe('bkash');
    expect(r.gateway!.supportsCurrency('USD')).toBe(true);
  });
});
