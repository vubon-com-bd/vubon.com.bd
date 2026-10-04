import { BadRequestException } from '@nestjs/common';
import { CheckoutHttpValidator } from '../../../../src/module/interfaces/validators/checkout.validator.js';

describe('CheckoutHttpValidator', () => {
  describe('validateStart()', () => {
    it('passes valid', () => {
      expect(() =>
        CheckoutHttpValidator.validateStart({
          email: 'c@example.com',
          cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        }),
      ).not.toThrow();
    });

    it('throws on missing email', () => {
      expect(() =>
        CheckoutHttpValidator.validateStart({
          cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        }),
      ).toThrow(BadRequestException);
    });

    it('throws on invalid email', () => {
      expect(() =>
        CheckoutHttpValidator.validateStart({
          email: 'not-email',
          cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        }),
      ).toThrow(BadRequestException);
    });

    it('throws on invalid cartId', () => {
      expect(() =>
        CheckoutHttpValidator.validateStart({
          email: 'c@example.com',
          cartId: 'bad',
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateSelectAddress()', () => {
    it('passes with shippingAddress', () => {
      expect(() =>
        CheckoutHttpValidator.validateSelectAddress({
          checkoutId: '77777777-7777-4777-8777-777777777777',
          shippingAddress: { line1: '123', city: 'Dhaka', country: 'BD' },
        }),
      ).not.toThrow();
    });

    it('throws on missing address', () => {
      expect(() =>
        CheckoutHttpValidator.validateSelectAddress({
          checkoutId: '77777777-7777-4777-8777-777777777777',
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateConfirm()', () => {
    it('passes with checkoutId', () => {
      expect(() =>
        CheckoutHttpValidator.validateConfirm({
          checkoutId: '77777777-7777-4777-8777-777777777777',
        }),
      ).not.toThrow();
    });

    it('throws on invalid checkoutId', () => {
      expect(() =>
        CheckoutHttpValidator.validateConfirm({ checkoutId: 'bad' }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateAbandon()', () => {
    it('passes with checkoutId', () => {
      expect(() =>
        CheckoutHttpValidator.validateAbandon({
          checkoutId: '77777777-7777-4777-8777-777777777777',
        }),
      ).not.toThrow();
    });
  });
});
