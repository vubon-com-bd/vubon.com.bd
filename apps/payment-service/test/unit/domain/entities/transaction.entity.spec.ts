/**
 * TransactionEntity — unit tests
 */
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../../../src/module/domain/value-objects/primitives/transaction-reference.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeTx(overrides: Partial<{ amount: number; type: string }> = {}): TransactionEntity {
  return TransactionEntity.create({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create(overrides.type ?? 'payment'),
      amount: overrides.amount ?? 1000,
      currency: 'BDT',
      reference: TransactionReferenceVO.create('ref-1'),
    },
  });
}

describe('TransactionEntity', () => {
  describe('create()', () => {
    it('creates a pending transaction', () => {
      const tx = makeTx();
      expect(tx.isPending()).toBe(true);
      expect(tx.amount).toBe(1000);
      expect(tx.currency).toBe('BDT');
    });

    it('emits TransactionCreatedEvent', () => {
      const tx = makeTx();
      expect(tx.domainEvents[0].type).toBe('transaction.created');
    });

    it('rejects non-positive amount', () => {
      expect(() => makeTx({ amount: 0 })).toThrow();
      expect(() => makeTx({ amount: -100 })).toThrow();
    });
  });

  describe('isDebit / isCredit / signedAmount', () => {
    it('payment is debit and returns negative signed amount', () => {
      const tx = makeTx({ type: 'payment' });
      expect(tx.isDebit()).toBe(true);
      expect(tx.isCredit()).toBe(false);
      expect(tx.signedAmount()).toBe(-1000);
    });

    it('refund is credit and returns positive signed amount', () => {
      const tx = makeTx({ type: 'refund' });
      expect(tx.isCredit()).toBe(true);
      expect(tx.signedAmount()).toBe(1000);
    });
  });

  describe('markSucceeded()', () => {
    it('transitions to success', () => {
      const tx = makeTx();
      tx.markSucceeded('gw_tx_123');
      expect(tx.isSuccess()).toBe(true);
      expect(tx.gatewayTransactionId).toBe('gw_tx_123');
      expect(tx.processedAt).toBeDefined();
    });
  });

  describe('markFailed()', () => {
    it('transitions to failed with reason', () => {
      const tx = makeTx();
      tx.markFailed(FailureReasonVO.create('gateway declined'));
      expect(tx.isFailed()).toBe(true);
      expect(tx.errorMessage?.value).toBe('gateway declined');
    });
  });

  describe('reverse()', () => {
    it('reverses a successful transaction', () => {
      const tx = makeTx();
      tx.markSucceeded();
      tx.reverse('admin');
      expect(tx.isReversed()).toBe(true);
      expect(tx.reversedAt).toBeDefined();
    });

    it('cannot reverse a pending transaction', () => {
      const tx = makeTx();
      expect(() => tx.reverse()).toThrow(BusinessRuleError);
    });
  });

  describe('settle()', () => {
    it('settles a successful transaction', () => {
      const tx = makeTx();
      tx.markSucceeded();
      tx.settle();
      expect(tx.isSettled()).toBe(true);
    });

    it('cannot settle a pending transaction', () => {
      const tx = makeTx();
      expect(() => tx.settle()).toThrow(BusinessRuleError);
    });
  });

  describe('cancel()', () => {
    it('cancels a pending transaction', () => {
      const tx = makeTx();
      tx.cancel('user aborted');
      expect(tx.status.value).toBe('cancelled');
    });
  });
});
