/**
 * CheckoutHttpValidator Tests
 * @module order-service/test/unit/interfaces/validators
 *
 * Tests against REAL application validator (Zod-based, no DB needed).
 */
import { BadRequestException } from '@nestjs/common';
import { CheckoutHttpValidator } from '@interfaces/validators/checkout.validator.js';

describe('CheckoutHttpValidator', () => {
  describe('validateStart', () => {
    it('should pass for minimal valid start body', () => {
      expect(() =>
        CheckoutHttpValidator.validateStart({
          cartId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          email: 'test@example.com',
        }),
      ).not.toThrow();
    });

    it('should throw BadRequestException for invalid body', () => {
      expect(() => CheckoutHttpValidator.validateStart({})).toThrow(
        BadRequestException,
      );
    });

    it('should throw for null body', () => {
      expect(() => CheckoutHttpValidator.validateStart(null)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateSelectAddress', () => {
    it('should pass for valid address selection', () => {
      expect(() =>
        CheckoutHttpValidator.validateSelectAddress({
          checkoutId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          shippingAddressId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        }),
      ).not.toThrow();
    });

    it('should throw for missing required fields', () => {
      expect(() =>
        CheckoutHttpValidator.validateSelectAddress({}),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateConfirm', () => {
    it('should throw for empty body', () => {
      expect(() => CheckoutHttpValidator.validateConfirm({})).toThrow(
        BadRequestException,
      );
    });
  });
});
