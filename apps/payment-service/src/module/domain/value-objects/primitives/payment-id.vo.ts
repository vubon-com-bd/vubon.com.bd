import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class PaymentIdVO extends BaseIdVO {
  static create(value: string): PaymentIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid payment id');
    }
    return new PaymentIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
