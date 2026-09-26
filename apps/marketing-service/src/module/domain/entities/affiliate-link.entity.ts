import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AffiliateLinkVO } from '../value-objects/composites/affiliate-link.vo';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';

export interface AffiliateLinkEntityProps {
  readonly affiliateId: AffiliateIdVO;
  readonly link: AffiliateLinkVO;
}

export class AffiliateLinkEntity extends BaseEntity<string> {
  private readonly _affiliateId: AffiliateIdVO;
  private readonly _link: AffiliateLinkVO;

  private constructor(
    id: string,
    props: AffiliateLinkEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._affiliateId = props.affiliateId;
    this._link = props.link;
  }

  static create(props: AffiliateLinkEntityProps): AffiliateLinkEntity {
    const now = new Date().toISOString();
    return new AffiliateLinkEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AffiliateLinkEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AffiliateLinkEntity {
    return new AffiliateLinkEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get affiliateId(): AffiliateIdVO { return this._affiliateId; }
  get link(): AffiliateLinkVO { return this._link; }
}
