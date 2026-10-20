/**
 * DeliveryValidator — Unit Tests
 * @module order-service/test/unit/application/validators
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryValidator } from '@application/validators/delivery.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('DeliveryValidator', () => {
  describe('validateSchedule', () => {
    it('accepts valid schedule input', () => {
      const result = DeliveryValidator.validateSchedule({
        orderId: VALID_UUID,
        deliveryMethodId: VALID_UUID,
      });
      expect(result.orderId).toBe(VALID_UUID);
    });

    it('accepts minimal input (only orderId)', () => {
      const result = DeliveryValidator.validateSchedule({ orderId: VALID_UUID });
      expect(result.orderId).toBe(VALID_UUID);
    });

    it('rejects missing orderId', () => {
      expect(() => DeliveryValidator.validateSchedule({})).toThrow(
        ApplicationValidationError,
      );
    });

    it('includes scope in error', () => {
      try {
        DeliveryValidator.validateSchedule({});
      } catch (err) {
        expect((err as ApplicationValidationError).message).toContain('Delivery.schedule');
      }
    });
  });

  describe('validateReschedule', () => {
    it('accepts valid reschedule', () => {
      const result = DeliveryValidator.validateReschedule({
        deliveryId: VALID_UUID,
        orderId: VALID_UUID,
        reason: 'Customer requested',
      });
      expect(result.reason).toBe('Customer requested');
    });

    it('rejects too-short reason', () => {
      expect(() =>
        DeliveryValidator.validateReschedule({
          deliveryId: VALID_UUID,
          orderId: VALID_UUID,
          reason: 'x',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateConfirm', () => {
    it('accepts valid confirm', () => {
      const result = DeliveryValidator.validateConfirm({
        deliveryId: VALID_UUID,
        orderId: VALID_UUID,
      });
      expect(result.deliveryId).toBe(VALID_UUID);
    });
  });
});
