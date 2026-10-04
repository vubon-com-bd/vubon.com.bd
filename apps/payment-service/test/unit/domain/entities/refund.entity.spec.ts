/**
 * RefundEntity — unit tests
 */
import { RefundEntity } from '../../../../src/module/domain/entities/refund.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { RefundReasonVO } from '../../../../src/module/domain/value-objects/primitives/refund-reason.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeRefund(amount = 500): RefundEntity {
  return RefundEntity.request({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      amount,
      currency: 'BDT',
      reason: RefundReasonVO.create('customer requested'),
    },
  });
}

describe('RefundEntity', () => {
  describe('request()', () => {
    it('creates a pending refund', () => {
      const r = makeRefund();
      expect(r.isPending()).toBe(true);
      expect(r.amount).toBe(500);
      expect(r.currency).toBe('BDT');
    });

    it('emits RefundRequestedEvent', () => {
      const r = makeRefund();
      expect(r.domainEvents[0].type).toBe('refund.requested');
    });

    it('rejects non-positive amount', () => {
      expect(() => makeRefund(0)).toThrow();
      expect(() => makeRefund(-10)).toThrow();
    });
  });

  describe('lifecycle: pending → processing → succeeded', () => {
    it('transitions to processing', () => {
      const r = makeRefund();
      r.startProcessing('gw_ref_1');
      expect(r.isProcessing()).toBe(true);
      expect(r.gatewayRefundId).toBe('gw_ref_1');
    });

    it('transitions to succeeded', () => {
      const r = makeRefund();
      r.startProcessing('gw_ref_1');
      r.succeed('gw_ref_1');
      expect(r.isSuccess()).toBe(true);
      expect(r.processedAt).toBeDefined();
    });
  });

  describe('failure path', () => {
    it('transitions to failed', () => {
      const r = makeRefund();
      r.fail(FailureReasonVO.create('gateway rejected'));
      expect(r.isFailed()).toBe(true);
      expect(r.failedAt).toBeDefined();
      expect(r.failureReason?.value).toBe('gateway rejected');
    });
  });

  describe('cancel', () => {
    it('transitions pending → cancelled', () => {
      const r = makeRefund();
      r.cancel('user withdrew');
      expect(r.isCancelled()).toBe(true);
    });
  });

  describe('isFinal()', () => {
    it('false while pending', () => {
      expect(makeRefund().isFinal()).toBe(false);
    });

    it('true after succeeded', () => {
      const r = makeRefund();
      r.startProcessing();
      r.succeed();
      expect(r.isFinal()).toBe(true);
    });

    it('true after failed', () => {
      const r = makeRefund();
      r.fail(FailureReasonVO.create('error'));
      expect(r.isFinal()).toBe(true);
    });
  });

  describe('state machine — invalid transitions', () => {
    it('cannot succeed directly from cancelled', () => {
      const r = makeRefund();
      r.cancel();
      expect(() => r.succeed()).toThrow(BusinessRuleError);
    });

    it('cannot fail after succeeded', () => {
      const r = makeRefund();
      r.startProcessing();
      r.succeed();
      expect(() => r.fail(FailureReasonVO.create('late'))).toThrow(BusinessRuleError);
    });
  });
});
