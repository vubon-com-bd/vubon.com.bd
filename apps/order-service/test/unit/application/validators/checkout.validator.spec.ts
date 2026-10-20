/**
 * CheckoutValidator — Unit Tests
 * @module order-service/test/unit/application/validators
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutValidator } from '@application/validators/checkout.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';
const VALID_EMAIL = 'user@example.com';

describe('CheckoutValidator', () => {
  describe('validateStart', () => {
    it('accepts valid start input', () => {
      const result = CheckoutValidator.validateStart({
        cartId: VALID_UUID,
        email: VALID_EMAIL,
      });
      expect(result.cartId).toBe(VALID_UUID);
      expect(result.email).toBe(VALID_EMAIL);
    });

    it('accepts with optional phone', () => {
      const result = CheckoutValidator.validateStart({
        cartId: VALID_UUID,
        email: VALID_EMAIL,
        phone: '+8801712345678',
      });
      expect(result.phone).toBe('+8801712345678');
    });

    it('rejects missing cartId', () => {
      expect(() =>
        CheckoutValidator.validateStart({ email: VALID_EMAIL }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects missing email', () => {
      expect(() =>
        CheckoutValidator.validateStart({ cartId: VALID_UUID }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects invalid email', () => {
      expect(() =>
        CheckoutValidator.validateStart({
          cartId: VALID_UUID,
          email: 'not-an-email',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('includes scope prefix', () => {
      try {
        CheckoutValidator.validateStart({});
      } catch (err) {
        expect((err as ApplicationValidationError).message).toContain('Checkout.start');
      }
    });
  });

  describe('validateSelectAddress', () => {
    it('accepts valid address selection', () => {
      const result = CheckoutValidator.validateSelectAddress({
        checkoutId: VALID_UUID,
        shippingAddressId: VALID_UUID,
      });
      expect(result.shippingAddressId).toBe(VALID_UUID);
    });

    it('rejects invalid shipping address id', () => {
      expect(() =>
        CheckoutValidator.validateSelectAddress({
          checkoutId: VALID_UUID,
          shippingAddressId: 'not-uuid',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateSelectShipping', () => {
    it('accepts valid shipping selection', () => {
      const result = CheckoutValidator.validateSelectShipping({
        checkoutId: VALID_UUID,
        shippingMethodId: VALID_UUID,
      });
      expect(result.shippingMethodId).toBe(VALID_UUID);
    });

    it('rejects missing shippingMethodId', () => {
      expect(() =>
        CheckoutValidator.validateSelectShipping({ checkoutId: VALID_UUID }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateConfirm', () => {
    it('accepts valid confirm', () => {
      const result = CheckoutValidator.validateConfirm({
        checkoutId: VALID_UUID,
        paymentMethod: 'bkash',
        acceptTerms: true,
      });
      expect(result.checkoutId).toBe(VALID_UUID);
      expect(result.paymentMethod).toBe('bkash');
      expect(result.acceptTerms).toBe(true);
    });

    it('accepts with all optional fields', () => {
      const result = CheckoutValidator.validateConfirm({
        checkoutId: VALID_UUID,
        paymentMethod: 'bkash',
        paymentGateway: 'bkash-gw',
        customerNotes: 'Please deliver fast',
        idempotencyKey: 'idem-key-12345678',
        acceptTerms: true,
      });
      expect(result.customerNotes).toBe('Please deliver fast');
    });

    it('rejects missing paymentMethod', () => {
      expect(() =>
        CheckoutValidator.validateConfirm({
          checkoutId: VALID_UUID,
          acceptTerms: true,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects acceptTerms false', () => {
      expect(() =>
        CheckoutValidator.validateConfirm({
          checkoutId: VALID_UUID,
          paymentMethod: 'bkash',
          acceptTerms: false,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects invalid checkoutId', () => {
      expect(() =>
        CheckoutValidator.validateConfirm({
          checkoutId: 'bad',
          paymentMethod: 'bkash',
          acceptTerms: true,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });
});
