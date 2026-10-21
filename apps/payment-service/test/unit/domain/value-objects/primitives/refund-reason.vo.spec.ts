/**
 * RefundReasonVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RefundReasonVO', () => {
  describe('create()', () => {
    it('creates customer_request', () => {
      const vo = RefundReasonVO.create('customer_request');
      expect(vo.reason).toBe('customer_request');
      expect(vo.note).toBeUndefined();
    });
    it('creates with note', () => {
      const vo = RefundReasonVO.create('customer_request', 'requested by user');
      expect(vo.note).toBe('requested by user');
    });
    it('normalizes case', () => {
      expect(RefundReasonVO.create('CUSTOMER_REQUEST').reason).toBe('customer_request');
    });
    it('accepts all valid reasons', () => {
      const reasons = ['customer_request', 'duplicate_charge', 'fraud', 'product_not_received', 'product_defective', 'service_not_rendered', 'order_cancelled', 'other'];
      for (const r of reasons) {
        expect(RefundReasonVO.create(r).reason).toBe(r);
      }
    });
    it('throws on invalid reason', () => {
      expect(() => RefundReasonVO.create('unknown')).toThrow(ValidationError);
    });
    it('throws on non-string reason', () => {
      expect(() => RefundReasonVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
    it('throws on too-long note', () => {
      expect(() => RefundReasonVO.create('customer_request', 'x'.repeat(501))).toThrow(ValidationError);
    });
    it('throws on non-string note', () => {
      expect(() => RefundReasonVO.create('customer_request', 123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves reason + note', () => {
      const vo = RefundReasonVO.reconstitute('fraud', 'suspicious');
      expect(vo.reason).toBe('fraud');
      expect(vo.note).toBe('suspicious');
    });
  });

  describe('predicates', () => {
    it('isCustomerRequest', () => {
      expect(RefundReasonVO.create('customer_request').isCustomerRequest()).toBe(true);
    });
    it('isFraud', () => {
      expect(RefundReasonVO.create('fraud').isFraud()).toBe(true);
    });
    it('isDuplicateCharge', () => {
      expect(RefundReasonVO.create('duplicate_charge').isDuplicateCharge()).toBe(true);
    });
    it('isOrderCancelled', () => {
      expect(RefundReasonVO.create('order_cancelled').isOrderCancelled()).toBe(true);
    });
  });
});
