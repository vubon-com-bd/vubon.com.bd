import { TransactionVO } from '../../../../../src/module/domain/value-objects/composites/transaction.vo.js';
import { TransactionIdVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-status.vo.js';
import { PaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { PaymentAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payment-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('TransactionVO', () => {
  it('creates valid VO', () => {
    const vo = TransactionVO.create({
      id: TransactionIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('payment'),
      status: TransactionStatusVO.create('pending'),
      amount: PaymentAmountVO.create(1000, 'BDT'),
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.amount.amount).toBe(1000);
    expect(vo.isDebit()).toBe(true);
  });

  it('signedAmount — negative for debit', () => {
    const vo = TransactionVO.create({
      id: TransactionIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('payment'),
      status: TransactionStatusVO.create('success'),
      amount: PaymentAmountVO.create(1000, 'BDT'),
      processedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.signedAmount()).toBe(-1000);
  });

  it('signedAmount — positive for credit', () => {
    const vo = TransactionVO.create({
      id: TransactionIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('refund'),
      status: TransactionStatusVO.create('success'),
      amount: PaymentAmountVO.create(500, 'BDT'),
      processedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.signedAmount()).toBe(500);
  });

  it('rejects zero amount', () => {
    expect(() =>
      TransactionVO.create({
        id: TransactionIdVO.create(UUID),
        paymentId: PaymentIdVO.create(UUID),
        type: TransactionTypeVO.create('payment'),
        status: TransactionStatusVO.create('pending'),
        amount: PaymentAmountVO.reconstitute(0, 'BDT'),
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('rejects success without processedAt', () => {
    expect(() =>
      TransactionVO.create({
        id: TransactionIdVO.create(UUID),
        paymentId: PaymentIdVO.create(UUID),
        type: TransactionTypeVO.create('payment'),
        status: TransactionStatusVO.create('success'),
        amount: PaymentAmountVO.create(1000, 'BDT'),
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow(ValidationError);
  });
});
