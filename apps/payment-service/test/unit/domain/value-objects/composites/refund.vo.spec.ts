/**
 * RefundVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundVO } from '@domain/composites/refund.vo';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof RefundVO.create>[0]> = {}) {
  return {
    id: RefundIdVO.create(TEST_IDS.REFUND_ID),
    paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    amount: RefundAmountVO.create(50, 'BDT'),
    reason: RefundReasonVO.create('customer_request'),
    status: RefundStatusVO.requested(),
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('RefundVO', () => {
  describe('create()', () => {
    it('creates valid refund', () => {
      const vo = RefundVO.create(makeProps());
      expect(vo.amount.amount).toBe(50);
      expect(vo.isCompleted()).toBe(false);
    });
    it('throws when approved without approvedBy', () => {
      expect(() =>
        RefundVO.create(makeProps({ status: RefundStatusVO.approved() })),
      ).toThrow(ValidationError);
    });
    it('accepts approved with approvedBy', () => {
      const vo = RefundVO.create(
        makeProps({ status: RefundStatusVO.approved(), approvedBy: 'admin-1' }),
      );
      expect(vo.approvedBy).toBe('admin-1');
    });
    it('throws when completed without completedAt', () => {
      expect(() =>
        RefundVO.create(makeProps({ status: RefundStatusVO.completed() })),
      ).toThrow(ValidationError);
    });
    it('accepts completed with completedAt', () => {
      const vo = RefundVO.create(
        makeProps({ status: RefundStatusVO.completed(), completedAt: TEST_DATES.NOW }),
      );
      expect(vo.isCompleted()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = RefundVO.reconstitute(
        makeProps({ status: RefundStatusVO.approved() }),
      );
      expect(vo.status.value).toBe('approved');
    });
  });

  describe('predicates', () => {
    it('isFinal for completed', () => {
      const vo = RefundVO.create(
        makeProps({ status: RefundStatusVO.completed(), completedAt: TEST_DATES.NOW }),
      );
      expect(vo.isFinal()).toBe(true);
    });
    it('isRetryable for failed', () => {
      expect(RefundVO.create(makeProps({ status: RefundStatusVO.failed() })).isRetryable()).toBe(true);
    });
  });
});
