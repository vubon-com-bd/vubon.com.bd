import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class PaymentMethodIdVO extends BaseIdVO {
  static create(value: string): PaymentMethodIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid payment method id');
    }
    return new PaymentMethodIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
