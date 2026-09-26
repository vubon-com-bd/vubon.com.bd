import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'one_time',
  'recurring',
  'installment',
  'subscription',
  'prepaid',
  'postpaid',
]);

export class PaymentTypeVO extends BaseTypeVO<string> {
  static create(value: string): PaymentTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid payment type: ${value}`);
    }
    return new PaymentTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
