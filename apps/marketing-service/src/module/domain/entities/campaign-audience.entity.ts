import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CampaignAudienceVO } from '../value-objects/composites/campaign-audience.vo';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';

export interface CampaignAudienceEntityProps {
  readonly campaignId: CampaignIdVO | null;
  readonly audience: CampaignAudienceVO;
}

export class CampaignAudienceEntity extends BaseEntity<string> {
  private readonly _campaignId: CampaignIdVO | null;
  private readonly _audience: CampaignAudienceVO;

  private constructor(
    id: string,
    props: CampaignAudienceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._campaignId = props.campaignId;
    this._audience = props.audience;
  }

  static create(props: CampaignAudienceEntityProps): CampaignAudienceEntity {
    const now = new Date().toISOString();
    return new CampaignAudienceEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: CampaignAudienceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CampaignAudienceEntity {
    return new CampaignAudienceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get campaignId(): CampaignIdVO | null { return this._campaignId; }
  get audience(): CampaignAudienceVO { return this._audience; }
}
