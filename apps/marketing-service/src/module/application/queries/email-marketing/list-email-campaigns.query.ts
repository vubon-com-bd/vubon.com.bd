import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListEmailCampaignsQuery extends BaseQuery {
  readonly type = 'marketing.email.list';
  constructor(public readonly status?: string) { super(); }
}
