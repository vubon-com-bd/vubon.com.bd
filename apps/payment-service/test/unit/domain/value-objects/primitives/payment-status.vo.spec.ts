/**
 * PaymentStatusVO unit tests — state machine
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PAYMENT_STATUS } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PaymentStatusVO', () => {
  describe('create()', () => {
    it('creates valid statuses', () => {
      for (const s of Object.values(PAYMENT_STATUS)) {
        const vo = PaymentStatusVO.create(s);
        expect(vo.value).toBe(s);
      }
    });

    it('normalizes case', () => {
      expect(PaymentStatusVO.create('PENDING').value).toBe('pending');
      expect(PaymentStatusVO.create('Paid').value).toBe('paid');
    });

    it('throws on invalid status', () => {
      expect(() => PaymentStatusVO.create('unknown')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => PaymentStatusVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('pending()', () => expect(PaymentStatusVO.pending().value).toBe('pending'));
    it('processing()', () => expect(PaymentStatusVO.processing().value).toBe('processing'));
    it('authorized()', () => expect(PaymentStatusVO.authorized().value).toBe('authorized'));
    it('captured()', () => expect(PaymentStatusVO.captured().value).toBe('captured'));
    it('paid()', () => expect(PaymentStatusVO.paid().value).toBe('paid'));
    it('failed()', () => expect(PaymentStatusVO.failed().value).toBe('failed'));
    it('declined()', () => expect(PaymentStatusVO.declined().value).toBe('declined'));
    it('cancelled()', () => expect(PaymentStatusVO.cancelled().value).toBe('cancelled'));
    it('refunded()', () => expect(PaymentStatusVO.refunded().value).toBe('refunded'));
    it('partiallyRefunded()', () => expect(PaymentStatusVO.partiallyRefunded().value).toBe('partially_refunded'));
  });

  describe('predicates', () => {
    it('isPending', () => {
      expect(PaymentStatusVO.pending().isPending()).toBe(true);
      expect(PaymentStatusVO.paid().isPending()).toBe(false);
    });
    it('isProcessing', () => expect(PaymentStatusVO.processing().isProcessing()).toBe(true));
    it('isAuthorized', () => expect(PaymentStatusVO.authorized().isAuthorized()).toBe(true));
    it('isCaptured', () => expect(PaymentStatusVO.captured().isCaptured()).toBe(true));
    it('isPaid', () => expect(PaymentStatusVO.paid().isPaid()).toBe(true));
    it('isFailed', () => expect(PaymentStatusVO.failed().isFailed()).toBe(true));
    it('isDeclined', () => expect(PaymentStatusVO.declined().isDeclined()).toBe(true));
    it('isCancelled', () => expect(PaymentStatusVO.cancelled().isCancelled()).toBe(true));
    it('isRefunded', () => expect(PaymentStatusVO.refunded().isRefunded()).toBe(true));
    it('isPartiallyRefunded', () => expect(PaymentStatusVO.partiallyRefunded().isPartiallyRefunded()).toBe(true));
    it('isChargeback', () => expect(PaymentStatusVO.create('chargeback').isChargeback()).toBe(true));
    it('isExpired', () => expect(PaymentStatusVO.create('expired').isExpired()).toBe(true));
  });

  describe('isSuccessful', () => {
    it('true for paid/captured/authorized', () => {
      expect(PaymentStatusVO.paid().isSuccessful()).toBe(true);
      expect(PaymentStatusVO.captured().isSuccessful()).toBe(true);
      expect(PaymentStatusVO.authorized().isSuccessful()).toBe(true);
    });
    it('false for pending/failed', () => {
      expect(PaymentStatusVO.pending().isSuccessful()).toBe(false);
      expect(PaymentStatusVO.failed().isSuccessful()).toBe(false);
    });
  });

  describe('isFinal', () => {
    it('true for paid/refunded/cancelled/chargeback/expired', () => {
      expect(PaymentStatusVO.paid().isFinal()).toBe(true);
      expect(PaymentStatusVO.refunded().isFinal()).toBe(true);
      expect(PaymentStatusVO.cancelled().isFinal()).toBe(true);
      expect(PaymentStatusVO.create('chargeback').isFinal()).toBe(true);
      expect(PaymentStatusVO.create('expired').isFinal()).toBe(true);
    });
    it('false for pending/processing/authorized', () => {
      expect(PaymentStatusVO.pending().isFinal()).toBe(false);
      expect(PaymentStatusVO.processing().isFinal()).toBe(false);
      expect(PaymentStatusVO.authorized().isFinal()).toBe(false);
    });
  });

  describe('isRefundable', () => {
    it('true for paid/captured/partially_refunded', () => {
      expect(PaymentStatusVO.paid().isRefundable()).toBe(true);
      expect(PaymentStatusVO.captured().isRefundable()).toBe(true);
      expect(PaymentStatusVO.partiallyRefunded().isRefundable()).toBe(true);
    });
    it('false for pending/failed/cancelled', () => {
      expect(PaymentStatusVO.pending().isRefundable()).toBe(false);
      expect(PaymentStatusVO.failed().isRefundable()).toBe(false);
      expect(PaymentStatusVO.cancelled().isRefundable()).toBe(false);
    });
  });

  describe('isRetryable', () => {
    it('true for failed/declined', () => {
      expect(PaymentStatusVO.failed().isRetryable()).toBe(true);
      expect(PaymentStatusVO.declined().isRetryable()).toBe(true);
    });
    it('false for paid/pending', () => {
      expect(PaymentStatusVO.paid().isRetryable()).toBe(false);
      expect(PaymentStatusVO.pending().isRetryable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → processing ok', () => {
      expect(PaymentStatusVO.pending().canTransitionTo('processing')).toBe(true);
    });
    it('pending → failed ok', () => {
      expect(PaymentStatusVO.pending().canTransitionTo('failed')).toBe(true);
    });
    it('pending → captured NOT ok', () => {
      expect(PaymentStatusVO.pending().canTransitionTo('captured')).toBe(false);
    });
    it('processing → captured ok', () => {
      expect(PaymentStatusVO.processing().canTransitionTo('captured')).toBe(true);
    });
    it('authorized → captured ok', () => {
      expect(PaymentStatusVO.authorized().canTransitionTo('captured')).toBe(true);
    });
    it('captured → paid ok', () => {
      expect(PaymentStatusVO.captured().canTransitionTo('paid')).toBe(true);
    });
    it('paid → refunded ok', () => {
      expect(PaymentStatusVO.paid().canTransitionTo('refunded')).toBe(true);
    });
    it('paid → partially_refunded ok', () => {
      expect(PaymentStatusVO.paid().canTransitionTo('partially_refunded')).toBe(true);
    });
    it('paid → pending NOT ok', () => {
      expect(PaymentStatusVO.paid().canTransitionTo('pending')).toBe(false);
    });
    it('failed → pending ok (retry)', () => {
      expect(PaymentStatusVO.failed().canTransitionTo('pending')).toBe(true);
    });
    it('declined → pending ok', () => {
      expect(PaymentStatusVO.declined().canTransitionTo('pending')).toBe(true);
    });
    it('cancelled → anything NOT ok', () => {
      expect(PaymentStatusVO.cancelled().canTransitionTo('pending')).toBe(false);
      expect(PaymentStatusVO.cancelled().canTransitionTo('paid')).toBe(false);
    });
    it('refunded → anything NOT ok', () => {
      expect(PaymentStatusVO.refunded().canTransitionTo('paid')).toBe(false);
    });
  });
});
