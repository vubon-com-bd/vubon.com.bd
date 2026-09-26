import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CardTokenVO } from '../primitives/card-token.vo';
import { CardLast4VO } from '../primitives/card-last4.vo';
import { CardBrandVO } from '../primitives/card-brand.vo';
import { CardExpiryVO } from '../primitives/card-expiry.vo';

export interface CardDetailsVOProps {
  readonly token: CardTokenVO;
  readonly last4: CardLast4VO;
  readonly brand: CardBrandVO;
  readonly expiry: CardExpiryVO;
}

/**
 * PCI-compliant card details — tokenized only.
 * Sensitive card data (PAN, security code, complete expiry) must never be persisted.
 */
export class CardDetailsVO extends BaseVO<CardDetailsVOProps> {
  private constructor(props: CardDetailsVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CardDetailsVOProps): CardDetailsVO {
    return new CardDetailsVO(props);
  }

  get token(): CardTokenVO { return this.value.token; }
  get last4(): CardLast4VO { return this.value.last4; }
  get brand(): CardBrandVO { return this.value.brand; }
  get expiry(): CardExpiryVO { return this.value.expiry; }
}
