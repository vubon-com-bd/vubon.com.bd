import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetEmailCampaignQuery extends BaseQuery {
  readonly type = 'marketing.email.get';
  constructor(public readonly campaignId: string) { super(); }
}
