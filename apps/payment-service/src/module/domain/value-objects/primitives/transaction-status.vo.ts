import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { TRANSACTION_STATUS } from '@vubon/shared-constants/business/payment';

const VALID = new Set<string>(Object.values(TRANSACTION_STATUS));

export class TransactionStatusVO extends BaseStatusVO<string> {
  static create(value: string): TransactionStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid transaction status: ${value}`);
    }
    return new TransactionStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
