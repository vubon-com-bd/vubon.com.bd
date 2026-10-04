/**
 * TransactionStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { TRANSACTION_STATUS } from '@vubon/shared-constants/business/payment';
import { InvalidTransactionStatusError } from '../../errors/transaction.errors.js';

const ALLOWED = Object.values(TRANSACTION_STATUS) as readonly string[];

export class TransactionStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TransactionStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidTransactionStatusError(raw, ALLOWED);
    }
    return new TransactionStatusVO(raw);
  }

  static reconstitute(raw: string): TransactionStatusVO {
    return new TransactionStatusVO(raw);
  }

  static pending(): TransactionStatusVO { return new TransactionStatusVO(TRANSACTION_STATUS.PENDING); }
  static success(): TransactionStatusVO { return new TransactionStatusVO(TRANSACTION_STATUS.SUCCESS); }
  static failed(): TransactionStatusVO { return new TransactionStatusVO(TRANSACTION_STATUS.FAILED); }
  static cancelled(): TransactionStatusVO { return new TransactionStatusVO(TRANSACTION_STATUS.CANCELLED); }
  static reversed(): TransactionStatusVO { return new TransactionStatusVO(TRANSACTION_STATUS.REVERSED); }
  static settled(): TransactionStatusVO { return new TransactionStatusVO(TRANSACTION_STATUS.SETTLED); }

  isTerminal(): boolean {
    return [
      TRANSACTION_STATUS.SUCCESS,
      TRANSACTION_STATUS.FAILED,
      TRANSACTION_STATUS.CANCELLED,
      TRANSACTION_STATUS.REVERSED,
      TRANSACTION_STATUS.SETTLED,
    ].includes(this.value as never);
  }

  isSuccess(): boolean {
    return this.value === TRANSACTION_STATUS.SUCCESS || this.value === TRANSACTION_STATUS.SETTLED;
  }

  canBeReversed(): boolean {
    return this.value === TRANSACTION_STATUS.SUCCESS;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [TRANSACTION_STATUS.PENDING]: [
        TRANSACTION_STATUS.SUCCESS,
        TRANSACTION_STATUS.FAILED,
        TRANSACTION_STATUS.CANCELLED,
      ],
      [TRANSACTION_STATUS.SUCCESS]: [TRANSACTION_STATUS.REVERSED, TRANSACTION_STATUS.SETTLED],
      [TRANSACTION_STATUS.FAILED]: [],
      [TRANSACTION_STATUS.CANCELLED]: [],
      [TRANSACTION_STATUS.REVERSED]: [],
      [TRANSACTION_STATUS.SETTLED]: [TRANSACTION_STATUS.REVERSED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
