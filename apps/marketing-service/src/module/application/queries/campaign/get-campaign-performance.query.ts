import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCampaignPerformanceQuery extends BaseQuery {
  readonly type = 'marketing.campaign.get-performance';

  constructor(public readonly campaignId: string) {
    super();
  }
}
