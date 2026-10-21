/**
 * RefundEntity unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RefundCompletedEvent } from '@domain/events/refund.events';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeRefund(): RefundEntity {
  return RefundEntity.create({
    id: RefundIdVO.create(TEST_IDS.REFUND_ID),
    props: {
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      amount: RefundAmountVO.create(50, 'BDT'),
      reason: RefundReasonVO.create('customer_request'),
      requestedBy: 'user-1',
    },
    now: TEST_DATES.NOW,
  });
}

describe('RefundEntity', () => {
  let refund: RefundEntity;

  beforeEach(() => {
    refund = makeRefund();
  });

  // ═══ create() ═══
  describe('create()', () => {
    it('creates in requested status', () => {
      expect(refund.status.isRequested()).toBe(true);
    });
    it('stores amount/reason', () => {
      expect(refund.amount.amount).toBe(50);
      expect(refund.reason.value.reason).toBe('customer_request');
    });
  });

  // ═══ Invariants ═══
  describe('invariants', () => {
    it('throws on zero amount', () => {
      expect(() =>
        RefundEntity.create({
          id: RefundIdVO.create(TEST_IDS.REFUND_ID),
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            amount: RefundAmountVO.reconstitute(0, 'BDT'),
            reason: RefundReasonVO.create('customer_request'),
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when approved without approvedBy', () => {
      expect(() =>
        RefundEntity.reconstitute({
          id: TEST_IDS.REFUND_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            amount: RefundAmountVO.reconstitute(50, 'BDT'),
            reason: RefundReasonVO.create('customer_request'),
            status: RefundStatusVO.approved(),
          },
        }),
      ).toThrow(ValidationError);
    });
    it('throws when completed without completedAt', () => {
      expect(() =>
        RefundEntity.reconstitute({
          id: TEST_IDS.REFUND_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            amount: RefundAmountVO.reconstitute(50, 'BDT'),
            reason: RefundReasonVO.create('customer_request'),
            status: RefundStatusVO.completed(),
          },
        }),
      ).toThrow(ValidationError);
    });
  });

  // ═══ approve() ═══
  describe('approve()', () => {
    it('requested → approved', () => {
      refund.approve('admin-1', TEST_DATES.NOW);
      expect(refund.status.isApproved()).toBe(true);
      expect(refund.approvedBy).toBe('admin-1');
    });
    it('throws when already completed', () => {
      refund.approve('admin', TEST_DATES.NOW);
      refund.startProcessing(TEST_DATES.NOW);
      refund.complete(TEST_DATES.NOW);
      expect(() => refund.approve('admin', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══ reject() ═══
  describe('reject()', () => {
    it('requested → rejected with reason', () => {
      refund.reject('policy violation', TEST_DATES.NOW);
      expect(refund.status.isRejected()).toBe(true);
      expect(refund.failureReason).toBe('policy violation');
    });
  });

  // ═══ startProcessing() ═══
  describe('startProcessing()', () => {
    beforeEach(() => refund.approve('admin', TEST_DATES.NOW));
    it('approved → processing', () => {
      refund.startProcessing(TEST_DATES.NOW);
      expect(refund.status.isProcessing()).toBe(true);
    });
    it('throws from requested', () => {
      const fresh = makeRefund();
      expect(() => fresh.startProcessing(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══ complete() ═══
  describe('complete()', () => {
    beforeEach(() => {
      refund.approve('admin', TEST_DATES.NOW);
      refund.startProcessing(TEST_DATES.NOW);
      refund.pullDomainEvents();
    });
    it('processing → completed with completedAt', () => {
      refund.complete(TEST_DATES.NOW);
      expect(refund.isCompleted()).toBe(true);
      expect(refund.completedAt).toBe(TEST_DATES.NOW);
    });
    it('emits RefundCompletedEvent', () => {
      refund.complete(TEST_DATES.NOW);
      expect(refund.domainEvents.some((e) => e instanceof RefundCompletedEvent)).toBe(true);
    });
  });

  // ═══ fail() ═══
  describe('fail()', () => {
    beforeEach(() => {
      refund.approve('admin', TEST_DATES.NOW);
      refund.startProcessing(TEST_DATES.NOW);
    });
    it('processing → failed with reason', () => {
      refund.fail('gateway down', TEST_DATES.NOW);
      expect(refund.status.isFailed()).toBe(true);
      expect(refund.failureReason).toBe('gateway down');
    });
  });

  // ═══ cancel() ═══
  describe('cancel()', () => {
    it('requested → cancelled', () => {
      refund.cancel(TEST_DATES.NOW);
      expect(refund.status.isCancelled()).toBe(true);
    });
  });

  // ═══ isFinal / isRetryable ═══
  describe('predicates', () => {
    it('isFinal — completed true', () => {
      refund.approve('admin', TEST_DATES.NOW);
      refund.startProcessing(TEST_DATES.NOW);
      refund.complete(TEST_DATES.NOW);
      expect(refund.isFinal()).toBe(true);
    });
    it('isRetryable — failed true', () => {
      refund.approve('admin', TEST_DATES.NOW);
      refund.startProcessing(TEST_DATES.NOW);
      refund.fail('err', TEST_DATES.NOW);
      expect(refund.isRetryable()).toBe(true);
    });
  });

  // ═══ reconstitute() ═══
  describe('reconstitute()', () => {
    it('rebuilds state', () => {
      const entity = RefundEntity.reconstitute({
        id: TEST_IDS.REFUND_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          amount: RefundAmountVO.reconstitute(50, 'BDT'),
          reason: RefundReasonVO.create('fraud', 'suspicious'),
          status: RefundStatusVO.completed(),
          approvedBy: 'admin-1',
          completedAt: TEST_DATES.NOW,
        },
      });
      expect(entity.isCompleted()).toBe(true);
    });
  });
});
