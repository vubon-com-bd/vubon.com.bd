import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSmsCampaignsQuery extends BaseQuery {
  readonly type = 'marketing.sms.list';
  constructor(public readonly status?: string) { super(); }
}
