/**
 * PaymentTransactionLedgerService — ledger-side classification
 * @module payment-service/domain/services
 *
 * Business rules:
 *  - payment.transfer → debit customer, credit platform
 *  - refund → credit customer, debit platform
 *  - payout → debit platform, credit vendor
 *  - chargeback → credit customer, debit platform
 */
import { TRANSACTION_TYPE } from '@vubon/shared-constants/business/payment';
import type { TransactionEntity } from '../entities/transaction.entity.js';

export interface LedgerEntry {
  readonly account: 'customer' | 'platform' | 'vendor';
  readonly side: 'debit' | 'credit';
  readonly amount: number;
  readonly currency: string;
  readonly transactionId: string;
}

export class PaymentTransactionLedgerService {
  static buildEntries(tx: TransactionEntity): readonly LedgerEntry[] {
    const amount = tx.amount;
    const currency = tx.currency;
    const id = tx.id;

    const debit = (account: LedgerEntry['account']): LedgerEntry => ({
      account,
      side: 'debit',
      amount,
      currency,
      transactionId: id,
    });
    const credit = (account: LedgerEntry['account']): LedgerEntry => ({
      account,
      side: 'credit',
      amount,
      currency,
      transactionId: id,
    });

    switch (tx.type.value) {
      case TRANSACTION_TYPE.PAYMENT:
      case TRANSACTION_TYPE.TRANSFER:
        return [debit('customer'), credit('platform')];
      case TRANSACTION_TYPE.REFUND:
      case TRANSACTION_TYPE.REVERSAL:
        return [debit('platform'), credit('customer')];
      case TRANSACTION_TYPE.PAYOUT:
        return [debit('platform'), credit('vendor')];
      case TRANSACTION_TYPE.CHARGEBACK:
        return [credit('customer'), debit('platform')];
      case TRANSACTION_TYPE.ADJUSTMENT:
        return [credit('platform'), debit('platform')];
      default:
        return [];
    }
  }

  static isBalanced(entries: readonly LedgerEntry[]): boolean {
    let debit = 0;
    let credit = 0;
    for (const e of entries) {
      if (e.side === 'debit') debit += e.amount;
      else credit += e.amount;
    }
    return Math.abs(debit - credit) < 0.01;
  }
}
