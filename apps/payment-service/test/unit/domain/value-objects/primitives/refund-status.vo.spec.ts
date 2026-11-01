/**
 * RefundStatusVO unit tests — state machine
 */
import { describe, it, expect } from '@jest/globals';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RefundStatusVO', () => {
  describe('create()', () => {
    it('accepts all valid statuses', () => {
      const statuses = ['requested', 'approved', 'rejected', 'processing', 'completed', 'failed', 'cancelled'];
      for (const s of statuses) {
        expect(RefundStatusVO.create(s).value).toBe(s);
      }
    });
    it('normalizes case', () => {
      expect(RefundStatusVO.create('REQUESTED').value).toBe('requested');
    });
    it('throws on invalid', () => {
      expect(() => RefundStatusVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('requested()', () => expect(RefundStatusVO.requested().value).toBe('requested'));
    it('approved()', () => expect(RefundStatusVO.approved().value).toBe('approved'));
    it('processing()', () => expect(RefundStatusVO.processing().value).toBe('processing'));
    it('completed()', () => expect(RefundStatusVO.completed().value).toBe('completed'));
    it('failed()', () => expect(RefundStatusVO.failed().value).toBe('failed'));
    it('rejected()', () => expect(RefundStatusVO.rejected().value).toBe('rejected'));
    it('cancelled()', () => expect(RefundStatusVO.cancelled().value).toBe('cancelled'));
  });

  describe('predicates', () => {
    it('isRequested', () => expect(RefundStatusVO.requested().isRequested()).toBe(true));
    it('isApproved', () => expect(RefundStatusVO.approved().isApproved()).toBe(true));
    it('isRejected', () => expect(RefundStatusVO.rejected().isRejected()).toBe(true));
    it('isProcessing', () => expect(RefundStatusVO.processing().isProcessing()).toBe(true));
    it('isCompleted', () => expect(RefundStatusVO.completed().isCompleted()).toBe(true));
    it('isFailed', () => expect(RefundStatusVO.failed().isFailed()).toBe(true));
    it('isCancelled', () => expect(RefundStatusVO.cancelled().isCancelled()).toBe(true));
  });

  describe('isFinal', () => {
    it('true for completed/rejected/cancelled', () => {
      expect(RefundStatusVO.completed().isFinal()).toBe(true);
      expect(RefundStatusVO.rejected().isFinal()).toBe(true);
      expect(RefundStatusVO.cancelled().isFinal()).toBe(true);
    });
    it('false for requested/approved/processing', () => {
      expect(RefundStatusVO.requested().isFinal()).toBe(false);
      expect(RefundStatusVO.approved().isFinal()).toBe(false);
      expect(RefundStatusVO.processing().isFinal()).toBe(false);
    });
  });

  describe('isRetryable', () => {
    it('true for failed only', () => {
      expect(RefundStatusVO.failed().isRetryable()).toBe(true);
    });
    it('false for completed/rejected', () => {
      expect(RefundStatusVO.completed().isRetryable()).toBe(false);
      expect(RefundStatusVO.rejected().isRetryable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('requested → approved ok', () => {
      expect(RefundStatusVO.requested().canTransitionTo('approved')).toBe(true);
    });
    it('requested → rejected ok', () => {
      expect(RefundStatusVO.requested().canTransitionTo('rejected')).toBe(true);
    });
    it('approved → processing ok', () => {
      expect(RefundStatusVO.approved().canTransitionTo('processing')).toBe(true);
    });
    it('processing → completed ok', () => {
      expect(RefundStatusVO.processing().canTransitionTo('completed')).toBe(true);
    });
    it('processing → failed ok', () => {
      expect(RefundStatusVO.processing().canTransitionTo('failed')).toBe(true);
    });
    it('failed → requested ok (retry)', () => {
      expect(RefundStatusVO.failed().canTransitionTo('requested')).toBe(true);
    });
    it('completed → anything NOT ok', () => {
      expect(RefundStatusVO.completed().canTransitionTo('requested')).toBe(false);
    });
    it('rejected → anything NOT ok', () => {
      expect(RefundStatusVO.rejected().canTransitionTo('approved')).toBe(false);
    });
  });
});
