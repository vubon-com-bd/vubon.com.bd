import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { TRANSACTION_TYPE } from '@vubon/shared-constants/business/payment';

const VALID = new Set<string>(Object.values(TRANSACTION_TYPE));

export class TransactionTypeVO extends BaseTypeVO<string> {
  static create(value: string): TransactionTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid transaction type: ${value}`);
    }
    return new TransactionTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
