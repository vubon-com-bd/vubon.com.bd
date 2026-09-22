import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';

const VALID = new Set<string>(Object.values(PAYMENT_GATEWAY));

export class PaymentGatewayVO extends BaseTypeVO<string> {
  static create(value: string): PaymentGatewayVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid payment gateway: ${value}`);
    }
    return new PaymentGatewayVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
