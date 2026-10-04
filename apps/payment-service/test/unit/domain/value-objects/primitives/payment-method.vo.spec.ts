import { PaymentMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { InvalidPaymentMethodError } from '../../../../../src/module/domain/errors/payment.errors.js';

describe('PaymentMethodVO', () => {
  it('creates for valid methods', () => {
    expect(PaymentMethodVO.create('card').value).toBe('card');
    expect(PaymentMethodVO.create('mobile_banking').value).toBe('mobile_banking');
    expect(PaymentMethodVO.create('cash_on_delivery').value).toBe('cash_on_delivery');
  });

  it('rejects invalid method', () => {
    expect(() => PaymentMethodVO.create('bogus')).toThrow(InvalidPaymentMethodError);
  });

  it('isCard for card/credit_card/debit_card', () => {
    expect(PaymentMethodVO.create('card').isCard()).toBe(true);
    expect(PaymentMethodVO.create('credit_card').isCard()).toBe(true);
    expect(PaymentMethodVO.create('debit_card').isCard()).toBe(true);
    expect(PaymentMethodVO.create('wallet').isCard()).toBe(false);
  });

  it('isMobileBanking for mobile_banking/wallet', () => {
    expect(PaymentMethodVO.create('mobile_banking').isMobileBanking()).toBe(true);
    expect(PaymentMethodVO.create('wallet').isMobileBanking()).toBe(true);
    expect(PaymentMethodVO.create('card').isMobileBanking()).toBe(false);
  });

  it('isBankBased for net_banking/bank_transfer', () => {
    expect(PaymentMethodVO.create('net_banking').isBankBased()).toBe(true);
    expect(PaymentMethodVO.create('bank_transfer').isBankBased()).toBe(true);
  });

  it('isCash for cash_on_delivery', () => {
    expect(PaymentMethodVO.create('cash_on_delivery').isCash()).toBe(true);
    expect(PaymentMethodVO.create('card').isCash()).toBe(false);
  });

  it('isOnline — opposite of isCash', () => {
    expect(PaymentMethodVO.create('card').isOnline()).toBe(true);
    expect(PaymentMethodVO.create('cash_on_delivery').isOnline()).toBe(false);
  });

  it('requiresGateway — true for non-cash', () => {
    expect(PaymentMethodVO.create('card').requiresGateway()).toBe(true);
    expect(PaymentMethodVO.create('cash_on_delivery').requiresGateway()).toBe(false);
  });
});
