/**
 * TransactionStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { TRANSACTION_STATUS } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TransactionStatusVO', () => {
  describe('create()', () => {
    it('accepts all valid statuses', () => {
      for (const s of Object.values(TRANSACTION_STATUS)) {
        expect(TransactionStatusVO.create(s).value).toBe(s);
      }
    });
    it('normalizes case', () => {
      expect(TransactionStatusVO.create('PENDING').value).toBe('pending');
    });
    it('throws on invalid', () => {
      expect(() => TransactionStatusVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('pending()', () => expect(TransactionStatusVO.pending().value).toBe('pending'));
    it('success()', () => expect(TransactionStatusVO.success().value).toBe('success'));
    it('failed()', () => expect(TransactionStatusVO.failed().value).toBe('failed'));
    it('settled()', () => expect(TransactionStatusVO.settled().value).toBe('settled'));
  });

  describe('predicates', () => {
    it('isPending', () => expect(TransactionStatusVO.pending().isPending()).toBe(true));
    it('isSuccess', () => expect(TransactionStatusVO.success().isSuccess()).toBe(true));
    it('isFailed', () => expect(TransactionStatusVO.failed().isFailed()).toBe(true));
    it('isCancelled', () => expect(TransactionStatusVO.create('cancelled').isCancelled()).toBe(true));
    it('isReversed', () => expect(TransactionStatusVO.create('reversed').isReversed()).toBe(true));
    it('isSettled', () => expect(TransactionStatusVO.settled().isSettled()).toBe(true));
  });

  describe('isFinal', () => {
    it('true for cancelled/reversed/settled', () => {
      expect(TransactionStatusVO.create('cancelled').isFinal()).toBe(true);
      expect(TransactionStatusVO.create('reversed').isFinal()).toBe(true);
      expect(TransactionStatusVO.settled().isFinal()).toBe(true);
    });
    it('false for pending/success', () => {
      expect(TransactionStatusVO.pending().isFinal()).toBe(false);
      expect(TransactionStatusVO.success().isFinal()).toBe(false);
    });
  });

  describe('isRetryable', () => {
    it('true for failed/pending', () => {
      expect(TransactionStatusVO.failed().isRetryable()).toBe(true);
      expect(TransactionStatusVO.pending().isRetryable()).toBe(true);
    });
    it('false for settled/cancelled', () => {
      expect(TransactionStatusVO.settled().isRetryable()).toBe(false);
      expect(TransactionStatusVO.create('cancelled').isRetryable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → success ok', () => {
      expect(TransactionStatusVO.pending().canTransitionTo('success')).toBe(true);
    });
    it('pending → failed ok', () => {
      expect(TransactionStatusVO.pending().canTransitionTo('failed')).toBe(true);
    });
    it('success → settled ok', () => {
      expect(TransactionStatusVO.success().canTransitionTo('settled')).toBe(true);
    });
    it('success → reversed ok', () => {
      expect(TransactionStatusVO.success().canTransitionTo('reversed')).toBe(true);
    });
    it('settled → reversed ok', () => {
      expect(TransactionStatusVO.settled().canTransitionTo('reversed')).toBe(true);
    });
    it('settled → pending NOT ok', () => {
      expect(TransactionStatusVO.settled().canTransitionTo('pending')).toBe(false);
    });
    it('failed → pending ok (retry)', () => {
      expect(TransactionStatusVO.failed().canTransitionTo('pending')).toBe(true);
    });
    it('cancelled → anything NOT ok', () => {
      expect(TransactionStatusVO.create('cancelled').canTransitionTo('pending')).toBe(false);
    });
  });
});
