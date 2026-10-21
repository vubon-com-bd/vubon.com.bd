/**
 * CardDetails Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 *
 * ⚠️ NEVER stores PAN or CVV — only tokenized data from the gateway.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CardTokenVO } from '@domain/primitives/card-token.vo';
import { CardLast4VO } from '@domain/primitives/card-last4.vo';
import { CardBrandVO } from '@domain/primitives/card-brand.vo';
import { CardExpiryVO } from '@domain/primitives/card-expiry.vo';

export interface CardDetailsVOProps {
  readonly token: CardTokenVO;
  readonly last4: CardLast4VO;
  readonly brand: CardBrandVO;
  readonly expiry: CardExpiryVO;
  readonly holderName?: string;
}

export class CardDetailsVO extends BaseVO<CardDetailsVOProps> {
  private constructor(props: CardDetailsVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CardDetailsVOProps): CardDetailsVO {
    const vo = new CardDetailsVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CardDetailsVOProps): CardDetailsVO {
    return new CardDetailsVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.brand.isKnown() && v.brand.requiresCvv() === false) {
      // noop — placeholder for future brand-specific rules
    }
    if (v.expiry.isExpired()) {
      throw new ValidationError('Card is expired', 'expiry');
    }
    if (v.holderName !== undefined && v.holderName.trim().length === 0) {
      throw new ValidationError('Card holder name cannot be blank', 'holderName');
    }
  }

  get token(): CardTokenVO { return this.value.token; }
  get last4(): CardLast4VO { return this.value.last4; }
  get brand(): CardBrandVO { return this.value.brand; }
  get expiry(): CardExpiryVO { return this.value.expiry; }
  get holderName(): string | undefined { return this.value.holderName; }

  display(): string {
    return `${this.brand.value.toUpperCase()} ${this.last4.masked()}`;
  }
}
