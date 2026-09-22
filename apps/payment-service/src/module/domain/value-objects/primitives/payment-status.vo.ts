import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { PAYMENT_STATUS } from '@vubon/shared-constants/business/payment';

const VALID = new Set<string>(Object.values(PAYMENT_STATUS));

export class PaymentStatusVO extends BaseStatusVO<string> {
  static create(value: string): PaymentStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid payment status: ${value}`);
    }
    return new PaymentStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
