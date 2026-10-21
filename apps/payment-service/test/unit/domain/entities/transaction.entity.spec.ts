/**
 * TransactionEntity unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TransactionSettledEvent } from '@domain/events/transaction.events';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeTxn(): TransactionEntity {
  return TransactionEntity.create({
    id: TransactionIdVO.create(TEST_IDS.TRANSACTION_ID),
    props: {
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      type: TransactionTypeVO.create('payment'),
      amount: PaymentAmountVO.create(100, 'BDT'),
    },
    now: TEST_DATES.NOW,
  });
}

describe('TransactionEntity', () => {
  let txn: TransactionEntity;

  beforeEach(() => {
    txn = makeTxn();
  });

  // ═══ create() ═══
  describe('create()', () => {
    it('creates in pending status', () => {
      expect(txn.status.isPending()).toBe(true);
    });
    it('stores paymentId/type/amount', () => {
      expect(txn.paymentId.value).toBe(TEST_IDS.PAYMENT_ID);
      expect(txn.type.isPayment()).toBe(true);
      expect(txn.amount.amount).toBe(100);
    });
  });

  // ═══ Invariants ═══
  describe('invariants', () => {
    it('throws on zero amount', () => {
      expect(() =>
        TransactionEntity.create({
          id: TransactionIdVO.create(TEST_IDS.TRANSACTION_ID),
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            type: TransactionTypeVO.create('payment'),
            amount: PaymentAmountVO.reconstitute(0, 'BDT'),
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when settled without settledAt', () => {
      expect(() =>
        TransactionEntity.reconstitute({
          id: TEST_IDS.TRANSACTION_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            type: TransactionTypeVO.create('payment'),
            status: TransactionStatusVO.settled(),
            amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          },
        }),
      ).toThrow(ValidationError);
    });
  });

  // ═══ markSuccess() ═══
  describe('markSuccess()', () => {
    it('pending → success', () => {
      txn.markSuccess('ch_test_123', TEST_DATES.NOW);
      expect(txn.isSuccess()).toBe(true);
    });
    it('sets gatewayReference', () => {
      txn.markSuccess('ch_test_123', TEST_DATES.NOW);
      expect(txn.gatewayReference?.value).toBe('ch_test_123');
    });
    it('throws when already settled', () => {
      txn.markSuccess('ch_1', TEST_DATES.NOW);
      txn.settle(TEST_DATES.NOW);
      expect(() => txn.markSuccess('ch_2', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══ markFailed() ═══
  describe('markFailed()', () => {
    it('pending → failed', () => {
      txn.markFailed('gateway error', TEST_DATES.NOW);
      expect(txn.status.isFailed()).toBe(true);
      expect(txn.failureReason).toBe('gateway error');
    });
    it('throws when settled', () => {
      txn.markSuccess('ch_1', TEST_DATES.NOW);
      txn.settle(TEST_DATES.NOW);
      expect(() => txn.markFailed('reason', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══ settle() ═══
  describe('settle()', () => {
    beforeEach(() => {
      txn.markSuccess('ch_1', TEST_DATES.NOW);
      txn.pullDomainEvents();
    });
    it('success → settled with settledAt', () => {
      txn.settle(TEST_DATES.NOW);
      expect(txn.isSettled()).toBe(true);
      expect(txn.settledAt).toBe(TEST_DATES.NOW);
    });
    it('emits TransactionSettledEvent', () => {
      txn.settle(TEST_DATES.NOW);
      expect(txn.domainEvents.some((e) => e instanceof TransactionSettledEvent)).toBe(true);
    });
    it('throws from pending', () => {
      const fresh = makeTxn();
      expect(() => fresh.settle(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══ reverse() ═══
  describe('reverse()', () => {
    it('success → reversed', () => {
      txn.markSuccess('ch_1', TEST_DATES.NOW);
      txn.reverse('chargeback', TEST_DATES.NOW);
      expect(txn.status.isReversed()).toBe(true);
    });
    it('throws from pending', () => {
      expect(() => txn.reverse('reason', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  // ═══ pullDomainEvents() ═══
  describe('pullDomainEvents()', () => {
    it('returns and clears buffer', () => {
      txn.markSuccess('ch_1', TEST_DATES.NOW);
      const events = txn.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(txn.domainEvents.length).toBe(0);
    });
  });

  // ═══ reconstitute() ═══
  describe('reconstitute()', () => {
    it('rebuilds state', () => {
      const entity = TransactionEntity.reconstitute({
        id: TEST_IDS.TRANSACTION_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          type: TransactionTypeVO.create('payment'),
          status: TransactionStatusVO.settled(),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          gatewayReference: GatewayReferenceVO.create('ch_test_123'),
          settledAt: TEST_DATES.NOW,
        },
      });
      expect(entity.isSettled()).toBe(true);
    });
  });
});
