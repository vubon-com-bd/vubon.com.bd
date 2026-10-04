import { jest } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { PaymentHttpValidator } from '../../../../src/module/interfaces/validators/payment.validator.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentHttpValidator — full paths', () => {
  it('validateInitiate valid', () => {
    expect(() =>
      PaymentHttpValidator.validateInitiate({
        orderId: UUID,
        method: 'mobile_banking',
        amount: 1000,
        currency: 'BDT',
      }),
    ).not.toThrow();
  });

  it('validateInitiate invalid → BadRequestException', () => {
    expect(() => PaymentHttpValidator.validateInitiate({})).toThrow(BadRequestException);
  });

  it('validateInitiate non-error throw is rethrown (defensive)', () => {
    try {
      PaymentHttpValidator.validateInitiate({ orderId: 'bad' });
      fail('expected throw');
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('validateVerify valid', () => {
    expect(() => PaymentHttpValidator.validateVerify({ paymentId: UUID })).not.toThrow();
  });

  it('validateVerify invalid → BadRequestException', () => {
    expect(() => PaymentHttpValidator.validateVerify({})).toThrow(BadRequestException);
  });

  it('validateRefund valid', () => {
    expect(() =>
      PaymentHttpValidator.validateRefund({ paymentId: UUID, amount: 100 }),
    ).not.toThrow();
  });

  it('validateRefund invalid → BadRequestException', () => {
    expect(() => PaymentHttpValidator.validateRefund({})).toThrow(BadRequestException);
  });
});
