/**
 * CardBrand Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CardBrandValue =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | 'unknown';

const VALID_BRANDS: readonly string[] = [
  'visa',
  'mastercard',
  'amex',
  'discover',
  'diners',
  'jcb',
  'unionpay',
  'unknown',
];

export class CardBrandVO extends BaseVO<CardBrandValue> {
  private constructor(value: CardBrandValue) {
    super(value);
  }

  static create(raw: string): CardBrandVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CardBrand must be a string', 'cardBrand');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_BRANDS.includes(normalized)) {
      throw new ValidationError(
        `Invalid CardBrand "${normalized}". Allowed: ${VALID_BRANDS.join(', ')}`,
        'cardBrand',
      );
    }
    return new CardBrandVO(normalized as CardBrandValue);
  }

  static reconstitute(raw: CardBrandValue): CardBrandVO {
    return new CardBrandVO(raw);
  }

  static fromPan(pan: string): CardBrandVO {
    const digits = pan.replace(/\D/g, '');
    if (/^4/.test(digits)) return new CardBrandVO('visa');
    if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return new CardBrandVO('mastercard');
    if (/^3[47]/.test(digits)) return new CardBrandVO('amex');
    if (/^6(?:011|5)/.test(digits)) return new CardBrandVO('discover');
    if (/^3(?:0[0-5]|[68])/.test(digits)) return new CardBrandVO('diners');
    if (/^35/.test(digits)) return new CardBrandVO('jcb');
    if (/^62/.test(digits)) return new CardBrandVO('unionpay');
    return new CardBrandVO('unknown');
  }

  isKnown(): boolean { return this.value !== 'unknown'; }

  requiresCvv(): boolean {
    return this.isKnown() && this.value !== 'unionpay';
  }
}
