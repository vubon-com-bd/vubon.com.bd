/**
 * PaymentEntity unit tests — aggregate root
 *
 * State machine (from PaymentStatusVO):
 *   pending → processing → authorized → captured → paid
 *   pending/processing → failed | declined
 *   authorized/processing → captured
 *   captured/paid → refunded | partially_refunded
 *   captured/paid → chargeback
 *
 * ⚠️ reconstitute() skips invariants by design (trusted DB source).
 *    Invariants only run at construction time via create().
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  PaymentCreatedEvent,
  PaymentStatusChangedEvent,
  PaymentCapturedEvent,
  PaymentFailedEvent,
  PaymentRefundedEvent,
} from '@domain/events/payment.events';
import { TEST_IDS, TEST_DATES, TEST_NUMBERS } from '@fixtures/index';

function makePayment(): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(TEST_NUMBERS.TYPICAL, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    },
    now: TEST_DATES.NOW,
  });
}

/** Helper — bring payment to captured state (processing → capture) */
function makeCaptured(): PaymentEntity {
  const p = makePayment();
  p.startProcessing(TEST_DATES.NOW);
  p.capture(100, 'ch_test_123', TEST_DATES.NOW);
  return p;
}

/** Helper — bring payment to paid state */
function makePaid(): PaymentEntity {
  const p = makeCaptured();
  p.markPaid(TEST_DATES.NOW);
  return p;
}

/** Helper — bring payment to authorized state (processing → authorized) */
function makeAuthorized(): PaymentEntity {
  const p = makePayment();
  p.startProcessing(TEST_DATES.NOW);
  p.authorize(TEST_DATES.NOW);
  return p;
}

describe('PaymentEntity — aggregate root', () => {
  let payment: PaymentEntity;

  beforeEach(() => {
    payment = makePayment();
  });

  // ═══════════════ create() ═══════════════
  describe('create()', () => {
    it('creates payment in pending status', () => {
      expect(payment.isPending()).toBe(true);
      expect(payment.version).toBe(1);
    });

    it('emits PaymentCreatedEvent', () => {
      expect(payment.domainEvents.some((e) => e instanceof PaymentCreatedEvent)).toBe(true);
    });

    it('sets amount/currency correctly', () => {
      expect(payment.amount.amount).toBe(TEST_NUMBERS.TYPICAL);
      expect(payment.currency.value).toBe('BDT');
    });

    it('COD payment requires no provider', () => {
      const cod = PaymentEntity.create({
        id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID_2),
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.create(100, 'BDT'),
          currency: PaymentCurrencyVO.create('BDT'),
          method: PaymentMethodTypeVO.create('cash_on_delivery', 'offline'),
        },
        now: TEST_DATES.NOW,
      });
      expect(cod.method.isCod()).toBe(true);
    });

    it('throws via create() when online method has no provider', () => {
      // create() runs invariants → this SHOULD throw
      expect(() =>
        PaymentEntity.create({
          id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID_2),
          props: {
            orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            amount: PaymentAmountVO.create(100, 'BDT'),
            currency: PaymentCurrencyVO.create('BDT'),
            method: PaymentMethodTypeVO.create('card', 'online'),
            // No provider
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('throws via create() on currency mismatch', () => {
      expect(() =>
        PaymentEntity.create({
          id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID_2),
          props: {
            orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            amount: PaymentAmountVO.create(100, 'USD'),
            currency: PaymentCurrencyVO.create('BDT'),
            method: PaymentMethodTypeVO.create('card', 'online'),
            provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  // ═══════════════ startProcessing() ═══════════════
  describe('startProcessing()', () => {
    it('pending → processing', () => {
      payment.startProcessing(TEST_DATES.NOW);
      expect(payment.isProcessing()).toBe(true);
    });

    it('throws from captured (not allowed)', () => {
      const captured = makeCaptured();
      expect(() => captured.startProcessing(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('throws from pending → authorized directly', () => {
      expect(() => payment.authorize(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ authorize() ═══════════════
  describe('authorize()', () => {
    it('processing → authorized', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.authorize(TEST_DATES.NOW);
      expect(payment.isAuthorized()).toBe(true);
      expect(payment.authorizedAt).toBe(TEST_DATES.NOW);
    });

    it('throws from pending (must go through processing)', () => {
      expect(() => payment.authorize(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('emits status change event', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.pullDomainEvents();
      payment.authorize(TEST_DATES.NOW);
      expect(payment.domainEvents.some((e) => e instanceof PaymentStatusChangedEvent)).toBe(true);
    });

    it('increments version', () => {
      payment.startProcessing(TEST_DATES.NOW);
      const v = payment.version;
      payment.authorize(TEST_DATES.NOW);
      expect(payment.version).toBe(v + 1);
    });

    it('throws from paid (invalid transition)', () => {
      const paid = makePaid();
      expect(() => paid.authorize(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ capture() ═══════════════
  describe('capture()', () => {
    it('processing → captured', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.capture(100, 'ch_test_123', TEST_DATES.NOW);
      expect(payment.isCaptured()).toBe(true);
      expect(payment.capturedAt).toBe(TEST_DATES.NOW);
    });

    it('authorized → captured', () => {
      const auth = makeAuthorized();
      auth.capture(100, 'ch_test_123', TEST_DATES.NOW);
      expect(auth.isCaptured()).toBe(true);
    });

    it('sets gateway reference', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.capture(100, 'ch_test_123', TEST_DATES.NOW);
      expect(payment.gatewayReference?.value).toBe('ch_test_123');
    });

    it('emits PaymentCapturedEvent', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.pullDomainEvents();
      payment.capture(100, 'ch_test_123', TEST_DATES.NOW);
      expect(payment.domainEvents.some((e) => e instanceof PaymentCapturedEvent)).toBe(true);
    });

    it('throws from pending (not capturable)', () => {
      expect(() => payment.capture(100, 'ch_1', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('throws from cancelled', () => {
      payment.cancel('test', 'admin', TEST_DATES.NOW);
      expect(() => payment.capture(100, 'ch_1', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ markPaid() ═══════════════
  describe('markPaid()', () => {
    it('captured → paid', () => {
      const captured = makeCaptured();
      captured.markPaid(TEST_DATES.NOW);
      expect(captured.isPaid()).toBe(true);
      expect(captured.paidAt).toBe(TEST_DATES.NOW);
    });

    it('throws from pending', () => {
      expect(() => payment.markPaid(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ fail() ═══════════════
  describe('fail()', () => {
    it('pending → failed with reason', () => {
      payment.fail('card_declined', 'CARD_DECLINED', TEST_DATES.NOW);
      expect(payment.isFailed()).toBe(true);
      expect(payment.failureReason).toBe('card_declined');
      expect(payment.failureCode).toBe('CARD_DECLINED');
    });

    it('emits PaymentFailedEvent', () => {
      payment.pullDomainEvents();
      payment.fail('card_declined', 'CARD_DECLINED', TEST_DATES.NOW);
      expect(payment.domainEvents.some((e) => e instanceof PaymentFailedEvent)).toBe(true);
    });

    it('throws from paid (terminal)', () => {
      const paid = makePaid();
      expect(() => paid.fail('reason', 'CODE', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ decline() ═══════════════
  describe('decline()', () => {
    it('processing → declined', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.decline('insufficient_funds', TEST_DATES.NOW);
      expect(payment.isDeclined()).toBe(true);
    });

    it('sets failureReason', () => {
      payment.startProcessing(TEST_DATES.NOW);
      payment.decline('fraud', TEST_DATES.NOW);
      expect(payment.failureReason).toBe('fraud');
    });

    it('throws from pending (invalid)', () => {
      expect(() => payment.decline('fraud', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ cancel() ═══════════════
  describe('cancel()', () => {
    it('pending → cancelled', () => {
      payment.cancel('user_request', 'admin-1', TEST_DATES.NOW);
      expect(payment.isCancelled()).toBe(true);
    });

    it('authorized → cancelled', () => {
      const auth = makeAuthorized();
      auth.cancel('user_request', 'admin-1', TEST_DATES.NOW);
      expect(auth.isCancelled()).toBe(true);
    });

    it('throws when captured (not cancellable)', () => {
      const captured = makeCaptured();
      expect(() => captured.cancel('reason', 'admin', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('throws when already paid', () => {
      const paid = makePaid();
      expect(() => paid.cancel('reason', 'admin', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ applyRefund() ═══════════════
  describe('applyRefund()', () => {
    it('partial refund → partially_refunded', () => {
      const paid = makePaid();
      paid.applyRefund(30, 'rfd_1', TEST_DATES.NOW);
      expect(paid.isPartiallyRefunded()).toBe(true);
      expect(paid.refundedAmount).toBe(30);
    });

    it('full refund → refunded', () => {
      const paid = makePaid();
      paid.applyRefund(100, 'rfd_1', TEST_DATES.NOW);
      expect(paid.isRefunded()).toBe(true);
      expect(paid.refundedAmount).toBe(100);
    });

    it('emits PaymentRefundedEvent', () => {
      const paid = makePaid();
      paid.pullDomainEvents();
      paid.applyRefund(30, 'rfd_1', TEST_DATES.NOW);
      expect(paid.domainEvents.some((e) => e instanceof PaymentRefundedEvent)).toBe(true);
    });

    it('throws on refund > remaining', () => {
      const paid = makePaid();
      paid.applyRefund(80, 'rfd_1', TEST_DATES.NOW);
      expect(() => paid.applyRefund(30, 'rfd_2', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('throws on zero refund amount', () => {
      const paid = makePaid();
      expect(() => paid.applyRefund(0, 'rfd_1', TEST_DATES.NOW)).toThrow(ValidationError);
    });

    it('throws when not refundable (pending)', () => {
      expect(() => payment.applyRefund(50, 'rfd_1', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });

    it('remainingRefundableAmount decrements', () => {
      const paid = makePaid();
      expect(paid.remainingRefundableAmount()).toBe(100);
      paid.applyRefund(30, 'rfd_1', TEST_DATES.NOW);
      expect(paid.remainingRefundableAmount()).toBe(70);
    });
  });

  // ═══════════════ chargeback() ═══════════════
  describe('chargeback()', () => {
    it('captured → chargeback', () => {
      const captured = makeCaptured();
      captured.chargeback('dispute raised', TEST_DATES.NOW);
      expect(captured.status.isChargeback()).toBe(true);
    });

    it('paid → chargeback', () => {
      const paid = makePaid();
      paid.chargeback('dispute raised', TEST_DATES.NOW);
      expect(paid.status.isChargeback()).toBe(true);
    });

    it('throws from pending', () => {
      expect(() => payment.chargeback('dispute', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ Predicates ═══════════════
  describe('predicates', () => {
    it('canBeCancelled — pending true', () => {
      expect(payment.canBeCancelled()).toBe(true);
    });

    it('canBeCancelled — captured false', () => {
      const captured = makeCaptured();
      expect(captured.canBeCancelled()).toBe(false);
    });

    it('canBeCaptured — authorized true', () => {
      const auth = makeAuthorized();
      expect(auth.canBeCaptured()).toBe(true);
    });

    it('canBeCaptured — pending false', () => {
      expect(payment.canBeCaptured()).toBe(false);
    });

    it('canBeRefunded — paid true', () => {
      const paid = makePaid();
      expect(paid.canBeRefunded()).toBe(true);
    });

    it('canBeRefunded — pending false', () => {
      expect(payment.canBeRefunded()).toBe(false);
    });
  });

  // ═══════════════ pullDomainEvents() ═══════════════
  describe('pullDomainEvents()', () => {
    it('returns events and clears buffer', () => {
      payment.startProcessing(TEST_DATES.NOW);
      const events = payment.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(payment.domainEvents.length).toBe(0);
    });
  });

  // ═══════════════ reconstitute() ═══════════════
  describe('reconstitute()', () => {
    it('rebuilds from persisted state with paid status', () => {
      const entity = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(500, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.paid(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'production'),
          capturedAt: TEST_DATES.YESTERDAY,
          paidAt: TEST_DATES.NOW,
        },
        version: 5,
      });
      expect(entity.amount.amount).toBe(500);
      expect(entity.version).toBe(5);
      expect(entity.isPaid()).toBe(true);
    });

    it('does NOT re-validate invariants (trusts DB source)', () => {
      // Intentionally broken state — reconstitute should NOT throw
      const entity = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.captured(),
          // Missing capturedAt — but reconstitute skips invariants
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
        },
      });
      expect(entity.isCaptured()).toBe(true);
    });

    it('preserves domain events buffer as empty', () => {
      const entity = PaymentEntity.reconstitute({
        id: TEST_IDS.PAYMENT_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          currency: PaymentCurrencyVO.reconstitute('BDT'),
          status: PaymentStatusVO.pending(),
          method: PaymentMethodTypeVO.create('card', 'online'),
          provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
        },
      });
      // reconstitute does not emit events
      expect(entity.domainEvents.length).toBe(0);
    });
  });
});
