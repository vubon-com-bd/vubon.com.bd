/**
 * CheckoutStepVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CheckoutStepVO', () => {
  describe('create', () => {
    it.each(['cart', 'shipping_address', 'shipping_method', 'payment_method', 'review', 'confirmation'])(
      'accepts "%s"',
      (s) => expect(CheckoutStepVO.create(s).value).toBe(s),
    );
    it('normalizes to lowercase', () => {
      expect(CheckoutStepVO.create('CART').value).toBe('cart');
    });
    it('trims whitespace', () => {
      expect(CheckoutStepVO.create('  cart  ').value).toBe('cart');
    });
    it('throws for invalid', () => {
      expect(() => CheckoutStepVO.create('unknown')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => CheckoutStepVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(CheckoutStepVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('index — all steps', () => {
    it('cart = 0', () => expect(CheckoutStepVO.cart().index).toBe(0));
    it('shipping_address = 1', () => {
      expect(CheckoutStepVO.create('shipping_address').index).toBe(1);
    });
    it('shipping_method = 2', () => {
      expect(CheckoutStepVO.create('shipping_method').index).toBe(2);
    });
    it('payment_method = 3', () => {
      expect(CheckoutStepVO.create('payment_method').index).toBe(3);
    });
    it('review = 4', () => {
      expect(CheckoutStepVO.create('review').index).toBe(4);
    });
    it('confirmation = 5', () => expect(CheckoutStepVO.confirmation().index).toBe(5));
  });

  describe('isLast', () => {
    it('true for confirmation only', () => {
      expect(CheckoutStepVO.confirmation().isLast()).toBe(true);
    });
    it('false for others', () => {
      expect(CheckoutStepVO.cart().isLast()).toBe(false);
      expect(CheckoutStepVO.create('shipping_address').isLast()).toBe(false);
      expect(CheckoutStepVO.create('shipping_method').isLast()).toBe(false);
      expect(CheckoutStepVO.create('payment_method').isLast()).toBe(false);
      expect(CheckoutStepVO.create('review').isLast()).toBe(false);
    });
  });

  describe('canAdvanceTo', () => {
    it('cart → shipping_address true', () => {
      expect(CheckoutStepVO.cart().canAdvanceTo(CheckoutStepVO.create('shipping_address'))).toBe(true);
    });
    it('cart → shipping_method false (skip)', () => {
      expect(CheckoutStepVO.cart().canAdvanceTo(CheckoutStepVO.create('shipping_method'))).toBe(false);
    });
    it('shipping_address → shipping_method true', () => {
      expect(
        CheckoutStepVO.create('shipping_address').canAdvanceTo(CheckoutStepVO.create('shipping_method')),
      ).toBe(true);
    });
    it('shipping_method → payment_method true', () => {
      expect(
        CheckoutStepVO.create('shipping_method').canAdvanceTo(CheckoutStepVO.create('payment_method')),
      ).toBe(true);
    });
    it('payment_method → review true', () => {
      expect(
        CheckoutStepVO.create('payment_method').canAdvanceTo(CheckoutStepVO.create('review')),
      ).toBe(true);
    });
    it('review → confirmation true', () => {
      expect(
        CheckoutStepVO.create('review').canAdvanceTo(CheckoutStepVO.create('confirmation')),
      ).toBe(true);
    });
    it('confirmation → nothing (last)', () => {
      expect(
        CheckoutStepVO.confirmation().canAdvanceTo(CheckoutStepVO.create('review')),
      ).toBe(false);
    });
    it('backward forbidden', () => {
      expect(CheckoutStepVO.create('review').canAdvanceTo(CheckoutStepVO.cart())).toBe(false);
    });
  });
});
