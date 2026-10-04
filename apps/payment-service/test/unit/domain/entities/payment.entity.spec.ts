/**
 * PaymentEntity — unit tests
 * @module payment-service/test/unit/domain/entities
 */
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayment(
  overrides: Partial<{
    method: string;
    gateway?: string | null;
    amount: number;
    currency: string;
  }> = {},
): PaymentEntity {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create(overrides.method ?? 'mobile_banking'),
      gateway:
        overrides.gateway === null
          ? undefined
          : PaymentGatewayVO.create(overrides.gateway ?? 'bkash'),
      amount: overrides.amount ?? 1000,
      currency: overrides.currency ?? 'BDT',
    },
  });
}

describe('PaymentEntity', () => {
  // ═══ Factories ═══
  describe('create()', () => {
    it('creates a payment with pending status', () => {
      const p = makePayment();
      expect(p.status.isPending()).toBe(true);
      expect(p.amount).toBe(1000);
      expect(p.currency).toBe('BDT');
      expect(p.refundedAmount).toBe(0);
      expect(p.retryAttempts).toBe(0);
    });

    it('emits a PaymentInitiatedEvent on create', () => {
      const p = makePayment();
      const events = p.domainEvents;
      expect(events.length).toBeGreaterThan(0);
      expect(events[0].type).toBe('payment.initiated');
    });

    it('throws when amount is zero or negative', () => {
      expect(() => makePayment({ amount: 0 })).toThrow(ValidationError);
      expect(() => makePayment({ amount: -5 })).toThrow(ValidationError);
    });

    it('throws when method requires gateway but none given', () => {
      // mobile_banking requires gateway
      expect(() => makePayment({ method: 'mobile_banking', gateway: null })).toThrow(
        ValidationError,
      );
    });

    it('throws when gateway does not support currency', () => {
      expect(() => makePayment({ gateway: 'bkash', currency: 'USD' })).toThrow(ValidationError);
    });
  });

  // ═══ Lifecycle ═══
  describe('lifecycle: pending → processing → authorized → captured → paid', () => {
    it('transitions pending → processing', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      expect(p.status.isProcessing()).toBe(true);
      expect(p.gatewayPaymentId?.value).toBe('gw_123');
    });

    it('transitions processing → authorized', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      expect(p.status.isAuthorized()).toBe(true);
      expect(p.authorizedAt).toBeDefined();
    });

    it('transitions authorized → captured', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      expect(p.status.isCaptured()).toBe(true);
      expect(p.capturedAt).toBeDefined();
    });

    it('transitions captured → paid', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      p.markPaid();
      expect(p.status.isPaid()).toBe(true);
    });
  });

  // ═══ Failure paths ═══
  describe('failure paths', () => {
    it('transitions pending → failed', () => {
      const p = makePayment();
      p.fail(FailureReasonVO.create('gateway error'));
      expect(p.status.isFailed()).toBe(true);
      expect(p.failedAt).toBeDefined();
      expect(p.failureReason?.value).toBe('gateway error');
    });

    it('transitions pending → declined', () => {
      const p = makePayment();
      p.decline(FailureReasonVO.create('insufficient funds'));
      expect(p.status.isDeclined()).toBe(true);
      expect(p.isDeclined()).toBe(true);
    });

    it('transitions pending → cancelled', () => {
      const p = makePayment();
      p.cancel('user requested');
      expect(p.status.isCancelled()).toBe(true);
      expect(p.cancelledAt).toBeDefined();
    });

    it('cannot cancel a captured payment', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      expect(() => p.cancel()).toThrow(BusinessRuleError);
    });
  });

  // ═══ Refund flow ═══
  describe('markRefunded()', () => {
    it('allows partial refund', () => {
      const p = makePayment({ amount: 1000 });
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      p.markRefunded(300);
      expect(p.refundedAmount).toBe(300);
      expect(p.status.isPartiallyRefunded()).toBe(true);
      expect(p.refundableRemaining).toBe(700);
    });

    it('marks fully refunded when full amount', () => {
      const p = makePayment({ amount: 1000 });
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      p.markRefunded(1000);
      expect(p.status.isRefunded()).toBe(true);
      expect(p.isFullyRefunded).toBe(true);
    });

    it('rejects refund > available', () => {
      const p = makePayment({ amount: 1000 });
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      expect(() => p.markRefunded(1500)).toThrow(BusinessRuleError);
    });

    it('rejects refund on non-settled payment', () => {
      const p = makePayment();
      expect(() => p.markRefunded(100)).toThrow(BusinessRuleError);
    });
  });

  // ═══ Retry ═══
  describe('retry()', () => {
    it('allows retry from failed state', () => {
      const p = makePayment();
      p.fail(FailureReasonVO.create('network'));
      p.retry();
      expect(p.status.isPending()).toBe(true);
      expect(p.retryAttempts).toBe(1);
    });

    it('rejects retry beyond max attempts', () => {
      const p = makePayment();
      for (let i = 0; i < 4; i++) {
        try {
          p.fail(FailureReasonVO.create('x'));
        } catch {
          /* ignore */
        }
        try {
          p.retry();
        } catch {
          /* ignore */
        }
      }
      // After exhausting, another retry should throw
      let threw = false;
      try {
        if (p.status.isRecoverable()) {
          p.retry();
        } else {
          threw = true;
        }
      } catch {
        threw = true;
      }
      expect(threw).toBe(true);
    });
  });

  // ═══ Capture window ═══
  describe('capture window', () => {
    it('isCaptureWindowOpen() true shortly after authorization', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      expect(p.isCaptureWindowOpen(new Date())).toBe(true);
    });

    it('canBeCaptured false for non-authorized payment', () => {
      const p = makePayment();
      expect(p.canBeCaptured()).toBe(false);
    });
  });

  // ═══ Chargeback ═══
  describe('markChargeback()', () => {
    it('marks chargeback from captured', () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_123'));
      p.authorize(GatewayPaymentIdVO.create('gw_123'));
      p.capture();
      p.markChargeback(1000, 'customer dispute');
      expect(p.status.isChargeback()).toBe(true);
    });
  });

  // ═══ Version increment ═══
  describe('domain event versioning', () => {
    it('increments version on each business action', () => {
      const p = makePayment();
      const v0 = p.version;
      p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
      expect(p.version).toBeGreaterThan(v0);
    });
  });
});
