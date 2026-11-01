/**
 * TransactionType Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TRANSACTION_TYPE } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type TransactionTypeValue =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

const VALID_TYPES: readonly string[] = Object.values(TRANSACTION_TYPE);

export class TransactionTypeVO extends BaseVO<TransactionTypeValue> {
  private constructor(value: TransactionTypeValue) {
    super(value);
  }

  static create(raw: string): TransactionTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TransactionType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid TransactionType "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new TransactionTypeVO(normalized as TransactionTypeValue);
  }

  static reconstitute(raw: TransactionTypeValue): TransactionTypeVO {
    return new TransactionTypeVO(raw);
  }

  isPayment(): boolean { return this.value === TRANSACTION_TYPE.PAYMENT; }
  isRefund(): boolean { return this.value === TRANSACTION_TYPE.REFUND; }
  isChargeback(): boolean { return this.value === TRANSACTION_TYPE.CHARGEBACK; }
  isPayout(): boolean { return this.value === TRANSACTION_TYPE.PAYOUT; }
  isTransfer(): boolean { return this.value === TRANSACTION_TYPE.TRANSFER; }
  isAdjustment(): boolean { return this.value === TRANSACTION_TYPE.ADJUSTMENT; }
  isReversal(): boolean { return this.value === TRANSACTION_TYPE.REVERSAL; }

  isDebit(): boolean {
    return this.isPayment() || this.isPayout() || this.isTransfer();
  }

  isCredit(): boolean {
    return this.isRefund() || this.isReversal();
  }
}
