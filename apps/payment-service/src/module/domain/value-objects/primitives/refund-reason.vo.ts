import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class RefundReasonVO extends BaseCodeVO {
  static create(value: string): RefundReasonVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Refund reason too short');
    }
    if (value.length > 500) {
      throw new Error('Refund reason too long');
    }
    return new RefundReasonVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
