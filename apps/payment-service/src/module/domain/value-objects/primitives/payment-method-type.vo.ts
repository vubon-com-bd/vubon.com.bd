import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PAYMENT_METHOD_TYPE } from '@vubon/shared-constants/business/payment';

const VALID = new Set<string>(Object.values(PAYMENT_METHOD_TYPE));

export class PaymentMethodTypeVO extends BaseTypeVO<string> {
  static create(value: string): PaymentMethodTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid payment method type: ${value}`);
    }
    return new PaymentMethodTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
