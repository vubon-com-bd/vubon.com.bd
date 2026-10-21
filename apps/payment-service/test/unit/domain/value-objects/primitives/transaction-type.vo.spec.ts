/**
 * TransactionTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TRANSACTION_TYPE } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TransactionTypeVO', () => {
  describe('create()', () => {
    it('accepts all valid types', () => {
      for (const t of Object.values(TRANSACTION_TYPE)) {
        expect(TransactionTypeVO.create(t).value).toBe(t);
      }
    });
    it('normalizes case', () => {
      expect(TransactionTypeVO.create('PAYMENT').value).toBe('payment');
    });
    it('throws on invalid', () => {
      expect(() => TransactionTypeVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isPayment', () => expect(TransactionTypeVO.create('payment').isPayment()).toBe(true));
    it('isRefund', () => expect(TransactionTypeVO.create('refund').isRefund()).toBe(true));
    it('isChargeback', () => expect(TransactionTypeVO.create('chargeback').isChargeback()).toBe(true));
    it('isPayout', () => expect(TransactionTypeVO.create('payout').isPayout()).toBe(true));
    it('isTransfer', () => expect(TransactionTypeVO.create('transfer').isTransfer()).toBe(true));
    it('isAdjustment', () => expect(TransactionTypeVO.create('adjustment').isAdjustment()).toBe(true));
    it('isReversal', () => expect(TransactionTypeVO.create('reversal').isReversal()).toBe(true));
  });

  describe('isDebit / isCredit', () => {
    it('isDebit for payment/payout/transfer', () => {
      expect(TransactionTypeVO.create('payment').isDebit()).toBe(true);
      expect(TransactionTypeVO.create('payout').isDebit()).toBe(true);
      expect(TransactionTypeVO.create('transfer').isDebit()).toBe(true);
    });
    it('isDebit false for refund', () => {
      expect(TransactionTypeVO.create('refund').isDebit()).toBe(false);
    });
    it('isCredit for refund/reversal', () => {
      expect(TransactionTypeVO.create('refund').isCredit()).toBe(true);
      expect(TransactionTypeVO.create('reversal').isCredit()).toBe(true);
    });
    it('isCredit false for payment', () => {
      expect(TransactionTypeVO.create('payment').isCredit()).toBe(false);
    });
  });
});
