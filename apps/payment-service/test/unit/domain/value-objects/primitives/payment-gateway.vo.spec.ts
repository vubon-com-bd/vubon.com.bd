import { PaymentGatewayVO } from '../../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { InvalidPaymentGatewayError } from '../../../../../src/module/domain/errors/payment.errors.js';

describe('PaymentGatewayVO', () => {
  it('creates for valid gateways', () => {
    expect(PaymentGatewayVO.create('bkash').value).toBe('bkash');
    expect(PaymentGatewayVO.create('stripe').value).toBe('stripe');
    expect(PaymentGatewayVO.create('manual').value).toBe('manual');
  });

  it('rejects invalid gateway', () => {
    expect(() => PaymentGatewayVO.create('unknown')).toThrow(InvalidPaymentGatewayError);
  });

  it('isLocal for BD local gateways', () => {
    expect(PaymentGatewayVO.create('bkash').isLocal()).toBe(true);
    expect(PaymentGatewayVO.create('nagad').isLocal()).toBe(true);
    expect(PaymentGatewayVO.create('rocket').isLocal()).toBe(true);
    expect(PaymentGatewayVO.create('stripe').isLocal()).toBe(false);
  });

  it('isAggregator for sslcommerz', () => {
    expect(PaymentGatewayVO.create('sslcommerz').isAggregator()).toBe(true);
    expect(PaymentGatewayVO.create('bkash').isAggregator()).toBe(false);
  });

  it('isInternational for stripe/paypal/etc', () => {
    expect(PaymentGatewayVO.create('stripe').isInternational()).toBe(true);
    expect(PaymentGatewayVO.create('paypal').isInternational()).toBe(true);
    expect(PaymentGatewayVO.create('bkash').isInternational()).toBe(false);
  });

  it('isManual for manual gateway', () => {
    expect(PaymentGatewayVO.create('manual').isManual()).toBe(true);
    expect(PaymentGatewayVO.create('bkash').isManual()).toBe(false);
  });

  it('supportsCurrency — local gateways only BDT', () => {
    expect(PaymentGatewayVO.create('bkash').supportsCurrency('BDT')).toBe(true);
    expect(PaymentGatewayVO.create('bkash').supportsCurrency('USD')).toBe(false);
  });

  it('supportsCurrency — international gateways support USD/EUR/GBP', () => {
    expect(PaymentGatewayVO.create('stripe').supportsCurrency('USD')).toBe(true);
    expect(PaymentGatewayVO.create('stripe').supportsCurrency('EUR')).toBe(true);
  });

  it('supportsWebhooks — false for manual', () => {
    expect(PaymentGatewayVO.create('bkash').supportsWebhooks()).toBe(true);
    expect(PaymentGatewayVO.create('manual').supportsWebhooks()).toBe(false);
  });

  it('requiresRedirect — false for international/manual', () => {
    expect(PaymentGatewayVO.create('bkash').requiresRedirect()).toBe(true);
    expect(PaymentGatewayVO.create('stripe').requiresRedirect()).toBe(false);
    expect(PaymentGatewayVO.create('manual').requiresRedirect()).toBe(false);
  });
});
