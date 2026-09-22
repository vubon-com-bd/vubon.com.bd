import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'visa',
  'mastercard',
  'amex',
  'discover',
  'jcb',
  'unionpay',
  'diners',
  'maestro',
  'unknown',
]);

export class CardBrandVO extends BaseTypeVO<string> {
  static create(value: string): CardBrandVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid card brand: ${value}`);
    }
    return new CardBrandVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
