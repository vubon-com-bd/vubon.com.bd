import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class RefundIdVO extends BaseIdVO {
  static create(value: string): RefundIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid refund id');
    }
    return new RefundIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
