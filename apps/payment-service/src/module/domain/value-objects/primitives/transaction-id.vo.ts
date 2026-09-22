import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class TransactionIdVO extends BaseIdVO {
  static create(value: string): TransactionIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid transaction id');
    }
    return new TransactionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
