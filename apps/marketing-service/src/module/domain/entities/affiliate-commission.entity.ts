import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AffiliateCommissionCompositeVO } from '../value-objects/composites/affiliate-commission-composite.vo';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';

export interface AffiliateCommissionEntityProps {
  readonly affiliateId: AffiliateIdVO;
  readonly commission: AffiliateCommissionCompositeVO;
}

export class AffiliateCommissionEntity extends BaseEntity<string> {
  private readonly _affiliateId: AffiliateIdVO;
  private readonly _commission: AffiliateCommissionCompositeVO;

  private constructor(
    id: string,
    props: AffiliateCommissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._affiliateId = props.affiliateId;
    this._commission = props.commission;
  }

  static create(props: AffiliateCommissionEntityProps): AffiliateCommissionEntity {
    const now = new Date().toISOString();
    return new AffiliateCommissionEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AffiliateCommissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AffiliateCommissionEntity {
    return new AffiliateCommissionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get affiliateId(): AffiliateIdVO { return this._affiliateId; }
  get commission(): AffiliateCommissionCompositeVO { return this._commission; }
}
