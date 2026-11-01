/**
 * OrderValidator — Unit Tests
 * @module order-service/test/unit/application/validators
 */
import { describe, it, expect } from '@jest/globals';
import { OrderValidator } from '@application/validators/order.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';
const VALID_ADDRESS = {
  line1: '123 Main St',
  city: 'Dhaka',
  country: 'BD',
};

describe('OrderValidator', () => {
  describe('validateCreate', () => {
    it('accepts valid input', () => {
      const input = {
        customerId: VALID_UUID,
        items: [
          {
            productId: VALID_UUID,
            quantity: 2,
          },
        ],
        shippingAddress: VALID_ADDRESS,
      };
      const result = OrderValidator.validateCreate(input);
      expect(result.customerId).toBe(VALID_UUID);
      expect(result.items.length).toBe(1);
    });

    it('rejects missing customerId', () => {
      expect(() =>
        OrderValidator.validateCreate({
          items: [{ productId: VALID_UUID, quantity: 1 }],
          shippingAddress: VALID_ADDRESS,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects empty items array', () => {
      expect(() =>
        OrderValidator.validateCreate({
          customerId: VALID_UUID,
          items: [],
          shippingAddress: VALID_ADDRESS,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('includes scope prefix in error message', () => {
      try {
        OrderValidator.validateCreate({});
      } catch (err) {
        expect(err).toBeInstanceOf(ApplicationValidationError);
        expect((err as ApplicationValidationError).message).toContain('Order.create');
      }
    });
  });

  describe('validateUpdate', () => {
    it('accepts valid update', () => {
      const result = OrderValidator.validateUpdate({
        orderId: VALID_UUID,
        status: 'confirmed',
      });
      expect(result.orderId).toBe(VALID_UUID);
    });

    it('rejects invalid status', () => {
      expect(() =>
        OrderValidator.validateUpdate({
          orderId: VALID_UUID,
          status: 'not-a-status',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects missing orderId', () => {
      expect(() =>
        OrderValidator.validateUpdate({ status: 'confirmed' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateDelete', () => {
    it('accepts valid delete', () => {
      const result = OrderValidator.validateDelete({
        orderId: VALID_UUID,
        reason: 'Duplicate order',
      });
      expect(result.orderId).toBe(VALID_UUID);
    });

    it('rejects missing orderId', () => {
      expect(() => OrderValidator.validateDelete({})).toThrow(
        ApplicationValidationError,
      );
    });
  });

  describe('validateConfirm', () => {
    it('accepts valid confirm', () => {
      const result = OrderValidator.validateConfirm({ orderId: VALID_UUID });
      expect(result.orderId).toBe(VALID_UUID);
    });

    it('rejects invalid uuid', () => {
      expect(() =>
        OrderValidator.validateConfirm({ orderId: 'not-uuid' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateHold', () => {
    it('accepts valid hold', () => {
      const result = OrderValidator.validateHold({
        orderId: VALID_UUID,
        reason: 'Customer requested hold',
      });
      expect(result.reason).toBe('Customer requested hold');
    });

    it('rejects too-short reason', () => {
      expect(() =>
        OrderValidator.validateHold({ orderId: VALID_UUID, reason: 'x' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRelease', () => {
    it('accepts valid release', () => {
      const result = OrderValidator.validateRelease({ orderId: VALID_UUID });
      expect(result.orderId).toBe(VALID_UUID);
    });
  });
});
