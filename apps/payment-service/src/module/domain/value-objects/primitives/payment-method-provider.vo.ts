import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';

const VALID = new Set<string>(Object.values(PAYMENT_GATEWAY));

export class PaymentMethodProviderVO extends BaseTypeVO<string> {
  static create(value: string): PaymentMethodProviderVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid payment method provider: ${value}`);
    }
    return new PaymentMethodProviderVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
