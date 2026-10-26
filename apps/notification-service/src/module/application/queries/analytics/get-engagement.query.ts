import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetEngagementQuery extends BaseQuery {
  readonly type = 'notification.analytics.engagement';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
