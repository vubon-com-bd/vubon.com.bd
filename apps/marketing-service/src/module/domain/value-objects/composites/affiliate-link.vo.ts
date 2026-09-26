import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AffiliateIdVO } from '../primitives/affiliate-id.vo';
import { ProductIdVO } from '../primitives/product-id.vo';

export interface AffiliateLinkProps {
  readonly affiliateId: AffiliateIdVO;
  readonly productId: ProductIdVO | null;
  readonly url: string;
  readonly clicks: number;
  readonly conversions: number;
}

export class AffiliateLinkVO extends BaseVO<AffiliateLinkProps> {
  private constructor(props: AffiliateLinkProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AffiliateLinkProps): AffiliateLinkVO {
    return new AffiliateLinkVO(props);
  }

  get affiliateId(): AffiliateIdVO { return this.value.affiliateId; }
  get productId(): ProductIdVO | null { return this.value.productId; }
  get url(): string { return this.value.url; }
  get clicks(): number { return this.value.clicks; }
  get conversions(): number { return this.value.conversions; }
}
