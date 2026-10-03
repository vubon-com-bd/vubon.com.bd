import { CheckoutValidator } from '../../../../src/module/application/validators/checkout.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

describe('CheckoutValidator', () => {
  it('validateStart passes valid', () => {
    expect(() => CheckoutValidator.validateStart({
      email: 'c@example.com',
      cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    })).not.toThrow();
  });

  it('validateStart throws on missing email', () => {
    expect(() => CheckoutValidator.validateStart({
      cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    })).toThrow(ApplicationValidationError);
  });

  it('validateSelectAddress passes', () => {
    expect(() => CheckoutValidator.validateSelectAddress({
      checkoutId: '77777777-7777-4777-8777-777777777777',
      shippingAddress: { line1: '123', city: 'Dhaka', country: 'BD' },
    })).not.toThrow();
  });

  it('validateSelectShipping passes', () => {
    expect(() => CheckoutValidator.validateSelectShipping({
      checkoutId: '77777777-7777-4777-8777-777777777777',
      shippingMethodId: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
    })).not.toThrow();
  });

  it('validateSelectPayment passes', () => {
    expect(() => CheckoutValidator.validateSelectPayment({
      checkoutId: '77777777-7777-4777-8777-777777777777',
      paymentMethod: 'card',
    })).not.toThrow();
  });

  it('validateConfirm passes', () => {
    expect(() => CheckoutValidator.validateConfirm({
      checkoutId: '77777777-7777-4777-8777-777777777777',
    })).not.toThrow();
  });

  it('validateAbandon passes', () => {
    expect(() => CheckoutValidator.validateAbandon({
      checkoutId: '77777777-7777-4777-8777-777777777777',
    })).not.toThrow();
  });
});
