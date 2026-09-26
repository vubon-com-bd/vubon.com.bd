import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CampaignPerformanceVO } from '../value-objects/composites/campaign-performance.vo';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';

export interface CampaignPerformanceEntityProps {
  readonly campaignId: CampaignIdVO;
  readonly performance: CampaignPerformanceVO;
}

export class CampaignPerformanceEntity extends BaseEntity<string> {
  private readonly _campaignId: CampaignIdVO;
  private readonly _performance: CampaignPerformanceVO;

  private constructor(
    id: string,
    props: CampaignPerformanceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._campaignId = props.campaignId;
    this._performance = props.performance;
  }

  static create(props: CampaignPerformanceEntityProps): CampaignPerformanceEntity {
    const now = new Date().toISOString();
    return new CampaignPerformanceEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: CampaignPerformanceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CampaignPerformanceEntity {
    return new CampaignPerformanceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get campaignId(): CampaignIdVO { return this._campaignId; }
  get performance(): CampaignPerformanceVO { return this._performance; }
}
