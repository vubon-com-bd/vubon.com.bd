/**
 * TransactionType Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { TRANSACTION_TYPE } from '@vubon/shared-constants/business/payment';
import { InvalidTransactionTypeError } from '../../errors/transaction.errors.js';

type TxTypeValue = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];
const ALLOWED = Object.values(TRANSACTION_TYPE) as readonly string[];

export class TransactionTypeVO extends BaseTypeVO<TxTypeValue> {
  private constructor(value: TxTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): TransactionTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidTransactionTypeError(raw, ALLOWED);
    }
    return new TransactionTypeVO(raw as TxTypeValue);
  }

  static reconstitute(raw: string): TransactionTypeVO {
    return new TransactionTypeVO(raw as TxTypeValue);
  }

  isDebit(): boolean {
    return (
      this.value === TRANSACTION_TYPE.PAYMENT ||
      this.value === TRANSACTION_TYPE.TRANSFER
    );
  }

  isCredit(): boolean {
    return (
      this.value === TRANSACTION_TYPE.REFUND ||
      this.value === TRANSACTION_TYPE.PAYOUT ||
      this.value === TRANSACTION_TYPE.REVERSAL
    );
  }

  isAdjustment(): boolean {
    return (
      this.value === TRANSACTION_TYPE.ADJUSTMENT ||
      this.value === TRANSACTION_TYPE.CHARGEBACK
    );
  }
}
