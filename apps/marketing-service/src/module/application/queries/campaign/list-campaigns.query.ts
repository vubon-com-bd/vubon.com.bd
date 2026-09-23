import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCampaignsQuery extends BaseQuery {
  readonly type = 'marketing.campaign.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
    public readonly status?: string,
  ) {
    super();
  }
}
