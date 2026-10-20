/**
 * OrderItemValidator — Unit Tests
 * @module order-service/test/unit/application/validators
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemValidator } from '@application/validators/order-item.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('OrderItemValidator', () => {
  describe('validateAdd', () => {
    it('accepts valid add item input', () => {
      const input = {
        orderId: VALID_UUID,
        productId: VALID_UUID,
        sku: 'SKU-001',
        name: 'Product A',
        quantity: 2,
        unitPrice: 99.99,
      };
      const result = OrderItemValidator.validateAdd(input);
      expect(result.sku).toBe('SKU-001');
      expect(result.quantity).toBe(2);
    });

    it('rejects zero quantity', () => {
      expect(() =>
        OrderItemValidator.validateAdd({
          orderId: VALID_UUID,
          productId: VALID_UUID,
          sku: 'SKU',
          name: 'P',
          quantity: 0,
          unitPrice: 1,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects negative price', () => {
      expect(() =>
        OrderItemValidator.validateAdd({
          orderId: VALID_UUID,
          productId: VALID_UUID,
          sku: 'SKU',
          name: 'P',
          quantity: 1,
          unitPrice: -1,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('includes scope in error', () => {
      try {
        OrderItemValidator.validateAdd({});
      } catch (err) {
        expect((err as ApplicationValidationError).message).toContain('OrderItem.add');
      }
    });
  });

  describe('validateUpdate', () => {
    it('accepts valid update', () => {
      const result = OrderItemValidator.validateUpdate({
        orderId: VALID_UUID,
        itemId: VALID_UUID,
        quantity: 5,
      });
      expect(result.quantity).toBe(5);
    });

    it('rejects oversized quantity', () => {
      expect(() =>
        OrderItemValidator.validateUpdate({
          orderId: VALID_UUID,
          itemId: VALID_UUID,
          quantity: 10000,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRemove', () => {
    it('accepts valid remove', () => {
      const result = OrderItemValidator.validateRemove({
        orderId: VALID_UUID,
        itemId: VALID_UUID,
      });
      expect(result.itemId).toBe(VALID_UUID);
    });

    it('rejects missing itemId', () => {
      expect(() =>
        OrderItemValidator.validateRemove({ orderId: VALID_UUID }),
      ).toThrow(ApplicationValidationError);
    });
  });
});
