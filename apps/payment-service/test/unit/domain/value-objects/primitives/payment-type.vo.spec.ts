import { PaymentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { InvalidPaymentTypeError } from '../../../../../src/module/domain/errors/payment.errors.js';

describe('PaymentTypeVO', () => {
  it('creates for valid types', () => {
    expect(PaymentTypeVO.create('one_time').value).toBe('one_time');
    expect(PaymentTypeVO.create('recurring').value).toBe('recurring');
    expect(PaymentTypeVO.create('installment').value).toBe('installment');
    expect(PaymentTypeVO.create('subscription').value).toBe('subscription');
  });

  it('rejects invalid type', () => {
    expect(() => PaymentTypeVO.create('bogus')).toThrow(InvalidPaymentTypeError);
  });

  it('isRecurring for recurring/subscription', () => {
    expect(PaymentTypeVO.recurring().isRecurring()).toBe(true);
    expect(PaymentTypeVO.subscription().isRecurring()).toBe(true);
    expect(PaymentTypeVO.oneTime().isRecurring()).toBe(false);
  });

  it('isInstallment', () => {
    expect(PaymentTypeVO.installment().isInstallment()).toBe(true);
    expect(PaymentTypeVO.oneTime().isInstallment()).toBe(false);
  });
});
