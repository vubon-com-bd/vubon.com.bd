import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSmsCampaignQuery extends BaseQuery {
  readonly type = 'marketing.sms.get';
  constructor(public readonly campaignId: string) { super(); }
}
