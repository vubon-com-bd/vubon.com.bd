/**
 * OrderHttpValidator Tests
 * @module order-service/test/unit/interfaces/validators
 *
 * Tests against REAL application validator (Zod-based, no DB needed).
 */
import { BadRequestException } from '@nestjs/common';
import { OrderHttpValidator } from '@interfaces/validators/order.validator.js';

describe('OrderHttpValidator', () => {
  describe('validateCreate', () => {
    it('should pass for valid create body', () => {
      expect(() =>
        OrderHttpValidator.validateCreate({
          customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          items: [
            {
              productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
              quantity: 2,
              unitPrice: 100,
            },
          ],
          shippingAddress: { line1: '123 St', city: 'Dhaka', country: 'BD' },
        }),
      ).not.toThrow();
    });

    it('should throw BadRequestException for empty body', () => {
      expect(() => OrderHttpValidator.validateCreate({})).toThrow(
        BadRequestException,
      );
    });

    it('should throw for null body', () => {
      expect(() => OrderHttpValidator.validateCreate(null)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateUpdate', () => {
    it('should throw for null body', () => {
      expect(() => OrderHttpValidator.validateUpdate(null)).toThrow(
        BadRequestException,
      );
    });

    it('should pass for valid update body', () => {
      expect(() =>
        OrderHttpValidator.validateUpdate({
          orderId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          notes: 'urgent',
        }),
      ).not.toThrow();
    });
  });

  describe('validateConfirm', () => {
    it('should throw for empty body', () => {
      expect(() => OrderHttpValidator.validateConfirm({})).toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateHold', () => {
    it('should throw for missing reason', () => {
      expect(() => OrderHttpValidator.validateHold({})).toThrow(
        BadRequestException,
      );
    });
  });
});
