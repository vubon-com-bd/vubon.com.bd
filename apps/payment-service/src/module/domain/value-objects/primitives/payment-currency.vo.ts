import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { CURRENCY } from '@vubon/shared-constants/common';

const VALID = new Set<string>(Object.values(CURRENCY));

export class PaymentCurrencyVO extends BaseTypeVO<string> {
  static create(value: string): PaymentCurrencyVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid currency: ${value}`);
    }
    return new PaymentCurrencyVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
