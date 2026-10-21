/**
 * TransactionStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → success → settled
 *   pending → failed | cancelled | reversed
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { TRANSACTION_STATUS } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type TransactionStatusValue =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(TRANSACTION_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<TransactionStatusValue, readonly TransactionStatusValue[]>
> = {
  [TRANSACTION_STATUS.PENDING]: [
    TRANSACTION_STATUS.SUCCESS,
    TRANSACTION_STATUS.FAILED,
    TRANSACTION_STATUS.CANCELLED,
  ],
  [TRANSACTION_STATUS.SUCCESS]: [
    TRANSACTION_STATUS.SETTLED,
    TRANSACTION_STATUS.REVERSED,
  ],
  [TRANSACTION_STATUS.FAILED]: [TRANSACTION_STATUS.PENDING],
  [TRANSACTION_STATUS.CANCELLED]: [],
  [TRANSACTION_STATUS.REVERSED]: [],
  [TRANSACTION_STATUS.SETTLED]: [TRANSACTION_STATUS.REVERSED],
};

export class TransactionStatusVO extends BaseStatusVO<TransactionStatusValue> {
  private constructor(value: TransactionStatusValue) {
    super(value);
  }

  static create(raw: string): TransactionStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TransactionStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid TransactionStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new TransactionStatusVO(normalized as TransactionStatusValue);
  }

  static pending(): TransactionStatusVO {
    return new TransactionStatusVO(TRANSACTION_STATUS.PENDING);
  }

  static success(): TransactionStatusVO {
    return new TransactionStatusVO(TRANSACTION_STATUS.SUCCESS);
  }

  static failed(): TransactionStatusVO {
    return new TransactionStatusVO(TRANSACTION_STATUS.FAILED);
  }

  static settled(): TransactionStatusVO {
    return new TransactionStatusVO(TRANSACTION_STATUS.SETTLED);
  }

  isPending(): boolean { return this.value === TRANSACTION_STATUS.PENDING; }
  isSuccess(): boolean { return this.value === TRANSACTION_STATUS.SUCCESS; }
  isFailed(): boolean { return this.value === TRANSACTION_STATUS.FAILED; }
  isCancelled(): boolean { return this.value === TRANSACTION_STATUS.CANCELLED; }
  isReversed(): boolean { return this.value === TRANSACTION_STATUS.REVERSED; }
  isSettled(): boolean { return this.value === TRANSACTION_STATUS.SETTLED; }

  isFinal(): boolean {
    return this.isCancelled() || this.isReversed() || this.isSettled();
  }

  isRetryable(): boolean {
    return this.isFailed() || this.isPending();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as TransactionStatusValue);
  }
}
