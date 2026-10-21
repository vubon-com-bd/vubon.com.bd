/**
 * TransactionVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TransactionVO } from '@domain/composites/transaction.vo';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof TransactionVO.create>[0]> = {}) {
  return {
    id: TransactionIdVO.create(TEST_IDS.TRANSACTION_ID),
    paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    type: TransactionTypeVO.create('payment'),
    status: TransactionStatusVO.pending(),
    amount: PaymentAmountVO.create(100, 'BDT'),
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('TransactionVO', () => {
  describe('create()', () => {
    it('creates valid transaction', () => {
      const vo = TransactionVO.create(makeProps());
      expect(vo.amount.amount).toBe(100);
      expect(vo.isDebit()).toBe(true);
    });
    it('throws when amount <= 0', () => {
      expect(() =>
        TransactionVO.create(
          makeProps({ amount: PaymentAmountVO.reconstitute(0, 'BDT') }),
        ),
      ).toThrow(ValidationError);
    });
    it('throws when success without gateway reference', () => {
      expect(() =>
        TransactionVO.create(makeProps({ status: TransactionStatusVO.success() })),
      ).toThrow(ValidationError);
    });
    it('accepts success with gateway reference', () => {
      const vo = TransactionVO.create(
        makeProps({
          status: TransactionStatusVO.success(),
          gatewayReference: GatewayReferenceVO.create('ch_test_123'),
        }),
      );
      expect(vo.isSuccess()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = TransactionVO.reconstitute(
        makeProps({ amount: PaymentAmountVO.reconstitute(0, 'BDT') }),
      );
      expect(vo.amount.amount).toBe(0);
    });
  });

  describe('predicates', () => {
    it('isDebit / isCredit', () => {
      expect(TransactionVO.create(makeProps()).isDebit()).toBe(true);
      expect(
        TransactionVO.create(makeProps({ type: TransactionTypeVO.create('refund') })).isCredit(),
      ).toBe(true);
    });
    it('isSuccess', () => {
      const vo = TransactionVO.create(
        makeProps({
          status: TransactionStatusVO.success(),
          gatewayReference: GatewayReferenceVO.create('ref_1'),
        }),
      );
      expect(vo.isSuccess()).toBe(true);
    });
    it('isFinal', () => {
      expect(
        TransactionVO.create(makeProps({ status: TransactionStatusVO.settled() })).isFinal(),
      ).toBe(true);
    });
    it('isRetryable', () => {
      expect(
        TransactionVO.create(makeProps({ status: TransactionStatusVO.failed() })).isRetryable(),
      ).toBe(true);
    });
  });
});
