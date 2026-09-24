import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class PaymentIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PaymentId cannot be empty');
    }
    return new PaymentIdVO(raw);
  }
}
