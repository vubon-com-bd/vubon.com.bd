/**
 * CancelReasonVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { CancelReasonVO } from '@domain/primitives/cancel-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CancelReasonVO', () => {
  describe('create', () => {
    it.each([
      'customer_request', 'out_of_stock', 'payment_failed',
      'fraud_suspected', 'address_invalid', 'delivery_unavailable',
      'price_error', 'duplicate_order', 'other',
    ])('accepts "%s"', (r) => expect(CancelReasonVO.create(r).value).toBe(r));
    it('normalizes to lowercase', () => {
      expect(CancelReasonVO.create('CUSTOMER_REQUEST').value).toBe('customer_request');
    });
    it('throws for invalid', () => {
      expect(() => CancelReasonVO.create('x')).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(CancelReasonVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('isCustomerInitiated', () => {
    it('true only for customer_request', () => {
      expect(CancelReasonVO.create('customer_request').isCustomerInitiated()).toBe(true);
    });
    it('false for system-initiated', () => {
      expect(CancelReasonVO.create('out_of_stock').isCustomerInitiated()).toBe(false);
      expect(CancelReasonVO.create('payment_failed').isCustomerInitiated()).toBe(false);
    });
  });

  describe('isSystemInitiated', () => {
    it('true for system reasons', () => {
      expect(CancelReasonVO.create('out_of_stock').isSystemInitiated()).toBe(true);
      expect(CancelReasonVO.create('payment_failed').isSystemInitiated()).toBe(true);
      expect(CancelReasonVO.create('fraud_suspected').isSystemInitiated()).toBe(true);
      expect(CancelReasonVO.create('price_error').isSystemInitiated()).toBe(true);
    });
    it('false for user reasons', () => {
      expect(CancelReasonVO.create('customer_request').isSystemInitiated()).toBe(false);
      expect(CancelReasonVO.create('address_invalid').isSystemInitiated()).toBe(false);
    });
  });
});
