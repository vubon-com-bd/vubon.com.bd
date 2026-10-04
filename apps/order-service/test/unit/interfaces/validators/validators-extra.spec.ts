import { BadRequestException } from '@nestjs/common';
import { OrderHttpValidator } from '../../../../src/module/interfaces/validators/order.validator.js';
import { CheckoutHttpValidator } from '../../../../src/module/interfaces/validators/checkout.validator.js';
import { ReturnHttpValidator } from '../../../../src/module/interfaces/validators/return.validator.js';

const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';

describe('HTTP validators extra paths', () => {
  it('OrderHttpValidator.validateCreate rejects non-object', () => {
    expect(() => OrderHttpValidator.validateCreate('bad'))
      .toThrow(BadRequestException);
  });

  it('OrderHttpValidator.validateCreate rejects bad item', () => {
    expect(() => OrderHttpValidator.validateCreate({
      customerId: '22222222-2222-4222-8222-222222222222',
      items: [{}],
      shippingAddress: { fullName: 'J', phone: '0', line1: 'x', city: 'y', country: 'BD' },
    })).toThrow(BadRequestException);
  });

  it('OrderHttpValidator.validateUpdate rejects bad orderId', () => {
    expect(() => OrderHttpValidator.validateUpdate({ orderId: 'x' }))
      .toThrow(BadRequestException);
  });

  it('CheckoutHttpValidator.validateStart rejects missing cartId', () => {
    expect(() => CheckoutHttpValidator.validateStart({ email: 'c@example.com' }))
      .toThrow(BadRequestException);
  });

  it('CheckoutHttpValidator.validateSelectAddress rejects missing shippingAddress', () => {
    expect(() => CheckoutHttpValidator.validateSelectAddress({
      checkoutId: UUID_CHECKOUT,
    })).toThrow(BadRequestException);
  });

  it('CheckoutHttpValidator.validateSelectShipping rejects bad shippingMethodId', () => {
    expect(() => CheckoutHttpValidator.validateSelectShipping({
      checkoutId: UUID_CHECKOUT,
      shippingMethodId: 'not-uuid',
    })).toThrow(BadRequestException);
  });

  it('CheckoutHttpValidator.validateSelectPayment rejects missing method', () => {
    expect(() => CheckoutHttpValidator.validateSelectPayment({
      checkoutId: UUID_CHECKOUT,
    })).toThrow(BadRequestException);
  });

  it('CheckoutHttpValidator.validateConfirm rejects bad checkoutId', () => {
    expect(() => CheckoutHttpValidator.validateConfirm({ checkoutId: 'x' }))
      .toThrow(BadRequestException);
  });

  it('CheckoutHttpValidator.validateAbandon rejects bad checkoutId', () => {
    expect(() => CheckoutHttpValidator.validateAbandon({ checkoutId: 'x' }))
      .toThrow(BadRequestException);
  });

  it('ReturnHttpValidator.validateRequest rejects bad reason', () => {
    expect(() => ReturnHttpValidator.validateRequest({
      orderId: UUID_ORDER,
      reason: 'bogus',
      itemIds: ['44444444-4444-4444-8444-444444444444'],
    })).toThrow(BadRequestException);
  });

  it('ReturnHttpValidator.validateApprove rejects missing orderId', () => {
    expect(() => ReturnHttpValidator.validateApprove({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    })).toThrow(BadRequestException);
  });

  it('ReturnHttpValidator.validateReject rejects missing reason', () => {
    expect(() => ReturnHttpValidator.validateReject({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      orderId: UUID_ORDER,
    })).toThrow(BadRequestException);
  });

  it('ReturnHttpValidator.validateComplete rejects bad refundAmount', () => {
    expect(() => ReturnHttpValidator.validateComplete({
      returnId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      orderId: UUID_ORDER,
      refundAmount: -1,
    })).toThrow(BadRequestException);
  });
});
