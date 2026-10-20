/**
 * ReturnValidator — Unit Tests
 * @module order-service/test/unit/application/validators
 */
import { describe, it, expect } from '@jest/globals';
import { ReturnValidator } from '@application/validators/return.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('ReturnValidator', () => {
  describe('validateRequestReturn', () => {
    it('accepts valid return request', () => {
      const result = ReturnValidator.validateRequestReturn({
        orderId: VALID_UUID,
        reason: 'defective',
        itemIds: [VALID_UUID],
      });
      expect(result.reason).toBe('defective');
      expect(result.itemIds.length).toBe(1);
    });

    it('rejects empty itemIds', () => {
      expect(() =>
        ReturnValidator.validateRequestReturn({
          orderId: VALID_UUID,
          reason: 'defective',
          itemIds: [],
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('rejects invalid reason', () => {
      expect(() =>
        ReturnValidator.validateRequestReturn({
          orderId: VALID_UUID,
          reason: 'invalid-reason',
          itemIds: [VALID_UUID],
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('includes scope', () => {
      try {
        ReturnValidator.validateRequestReturn({});
      } catch (err) {
        expect((err as ApplicationValidationError).message).toContain('Return.request');
      }
    });
  });

  describe('validateApproveReturn', () => {
    it('accepts valid approve', () => {
      const result = ReturnValidator.validateApproveReturn({
        returnId: VALID_UUID,
        orderId: VALID_UUID,
      });
      expect(result.returnId).toBe(VALID_UUID);
    });
  });

  describe('validateRejectReturn', () => {
    it('accepts valid reject', () => {
      const result = ReturnValidator.validateRejectReturn({
        returnId: VALID_UUID,
        orderId: VALID_UUID,
        reason: 'Not eligible',
      });
      expect(result.reason).toBe('Not eligible');
    });

    it('rejects short reason', () => {
      expect(() =>
        ReturnValidator.validateRejectReturn({
          returnId: VALID_UUID,
          orderId: VALID_UUID,
          reason: 'x',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateCompleteReturn', () => {
    it('accepts valid complete', () => {
      const result = ReturnValidator.validateCompleteReturn({
        returnId: VALID_UUID,
        orderId: VALID_UUID,
        refundAmount: 100.5,
      });
      expect(result.refundAmount).toBe(100.5);
    });

    it('rejects negative refund', () => {
      expect(() =>
        ReturnValidator.validateCompleteReturn({
          returnId: VALID_UUID,
          orderId: VALID_UUID,
          refundAmount: -1,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRequestCancel', () => {
    it('accepts valid cancel request', () => {
      const result = ReturnValidator.validateRequestCancel({
        orderId: VALID_UUID,
        reason: 'customer_request',
      });
      expect(result.reason).toBe('customer_request');
    });
  });

  describe('validateApproveCancel', () => {
    it('accepts valid approve', () => {
      const result = ReturnValidator.validateApproveCancel({
        cancelId: VALID_UUID,
        orderId: VALID_UUID,
      });
      expect(result.cancelId).toBe(VALID_UUID);
    });
  });

  describe('validateRejectCancel', () => {
    it('accepts valid reject', () => {
      const result = ReturnValidator.validateRejectCancel({
        cancelId: VALID_UUID,
        orderId: VALID_UUID,
        reason: 'Not allowed',
      });
      expect(result.reason).toBe('Not allowed');
    });
  });
});
