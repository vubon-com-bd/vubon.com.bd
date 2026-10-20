/**
 * CheckoutControllerMapper Tests
 * @module order-service/test/unit/interfaces/mappers
 */
import { BadRequestException } from '@nestjs/common';
import { CheckoutControllerMapper } from '@interfaces/mappers/checkout.controller.mapper.js';

describe('CheckoutControllerMapper', () => {
  describe('toStartAppDto', () => {
    it('should map start checkout with defaults', () => {
      const result = CheckoutControllerMapper.toStartAppDto({
        cartId: 'cart-1',
        email: 'test@example.com',
        phone: '+8801712345678',
      } as never);
      expect(result.cartId).toBe('cart-1');
      expect(result.email).toBe('test@example.com');
      expect(result.type).toBe('registered');
    });

    it('should override type when provided', () => {
      const result = CheckoutControllerMapper.toStartAppDto({
        cartId: 'cart-1',
        type: 'guest',
        email: 'test@example.com',
      } as never);
      expect(result.type).toBe('guest');
    });

    it('should include actorId when passed', () => {
      const result = CheckoutControllerMapper.toStartAppDto(
        { cartId: 'c', email: 'a@b.com' } as never,
        'user-1',
      );
      expect(result.actorId).toBe('user-1');
    });
  });

  describe('toSelectAddressDto', () => {
    it('should map address selection', () => {
      const result = CheckoutControllerMapper.toSelectAddressDto('checkout-1', {
        shippingAddressId: 'addr-1',
      } as never);
      expect(result.checkoutId).toBe('checkout-1');
      expect(result.shippingAddressId).toBe('addr-1');
      expect(result.useShippingAsBilling).toBe(true);
    });

    it('should throw when neither shippingAddressId nor shippingAddress', () => {
      expect(() =>
        CheckoutControllerMapper.toSelectAddressDto('checkout-1', {} as never),
      ).toThrow(BadRequestException);
    });

    it('should set useShippingAsBilling=false when billingAddressId given', () => {
      const result = CheckoutControllerMapper.toSelectAddressDto('checkout-1', {
        shippingAddressId: 'addr-1',
        billingAddressId: 'addr-2',
      } as never);
      expect(result.useShippingAsBilling).toBe(false);
      expect(result.billingAddressId).toBe('addr-2');
    });
  });

  describe('toSelectShippingDto', () => {
    it('should map shipping method', () => {
      const result = CheckoutControllerMapper.toSelectShippingDto('checkout-1', {
        shippingMethodId: 'method-1',
        notes: 'express please',
      } as never);
      expect(result.checkoutId).toBe('checkout-1');
      expect(result.shippingMethodId).toBe('method-1');
      expect(result.notes).toBe('express please');
    });
  });

  describe('toSelectPaymentDto', () => {
    it('should map payment method', () => {
      const result = CheckoutControllerMapper.toSelectPaymentDto('checkout-1', {
        paymentMethod: 'bkash',
      } as never);
      expect(result.checkoutId).toBe('checkout-1');
      expect(result.paymentMethod).toBe('bkash');
    });
  });

  describe('toConfirmDto', () => {
    it('should map confirm DTO with acceptTerms=true', () => {
      const result = CheckoutControllerMapper.toConfirmDto(
        'checkout-1',
        { paymentMethod: 'bkash', acceptTerms: true } as never,
        'user-1',
      );
      expect(result.checkoutId).toBe('checkout-1');
      expect(result.paymentMethod).toBe('bkash');
      expect(result.acceptTerms).toBe(true);
      expect(result.actorId).toBe('user-1');
    });
  });

  describe('toAbandonDto', () => {
    it('should map abandon DTO', () => {
      const result = CheckoutControllerMapper.toAbandonDto('checkout-1', {
        reason: 'changed mind',
      } as never);
      expect(result.checkoutId).toBe('checkout-1');
      expect(result.reason).toBe('changed mind');
    });
  });
});
