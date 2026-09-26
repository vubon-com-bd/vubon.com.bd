import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCampaignQuery extends BaseQuery {
  readonly type = 'marketing.campaign.get';

  constructor(public readonly campaignId: string) {
    super();
  }
}
