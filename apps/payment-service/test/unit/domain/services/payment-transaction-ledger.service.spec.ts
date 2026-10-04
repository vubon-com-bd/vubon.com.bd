import { PaymentTransactionLedgerService } from '../../../../src/module/domain/services/payment-transaction-ledger.service.js';
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionReferenceVO } from '../../../../src/module/domain/value-objects/primitives/transaction-reference.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeTx(type: string, amount = 1000): TransactionEntity {
  return TransactionEntity.create({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create(type),
      amount,
      currency: 'BDT',
      reference: TransactionReferenceVO.create('ref'),
    },
  });
}

describe('PaymentTransactionLedgerService', () => {
  it('payment → debit customer, credit platform', () => {
    const entries = PaymentTransactionLedgerService.buildEntries(makeTx('payment'));
    expect(entries).toHaveLength(2);
    expect(entries[0]).toMatchObject({ account: 'customer', side: 'debit' });
    expect(entries[1]).toMatchObject({ account: 'platform', side: 'credit' });
  });

  it('refund → debit platform, credit customer', () => {
    const entries = PaymentTransactionLedgerService.buildEntries(makeTx('refund'));
    expect(entries[0]).toMatchObject({ account: 'platform', side: 'debit' });
    expect(entries[1]).toMatchObject({ account: 'customer', side: 'credit' });
  });

  it('payout → debit platform, credit vendor', () => {
    const entries = PaymentTransactionLedgerService.buildEntries(makeTx('payout'));
    expect(entries[0]).toMatchObject({ account: 'platform', side: 'debit' });
    expect(entries[1]).toMatchObject({ account: 'vendor', side: 'credit' });
  });

  it('chargeback → credit customer, debit platform', () => {
    const entries = PaymentTransactionLedgerService.buildEntries(makeTx('chargeback'));
    expect(entries[0]).toMatchObject({ account: 'customer', side: 'credit' });
    expect(entries[1]).toMatchObject({ account: 'platform', side: 'debit' });
  });

  it('isBalanced — true for payment entries', () => {
    const entries = PaymentTransactionLedgerService.buildEntries(makeTx('payment'));
    expect(PaymentTransactionLedgerService.isBalanced(entries)).toBe(true);
  });

  it('isBalanced — true for refund entries', () => {
    const entries = PaymentTransactionLedgerService.buildEntries(makeTx('refund'));
    expect(PaymentTransactionLedgerService.isBalanced(entries)).toBe(true);
  });
});
