import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.user';

  constructor(public readonly userId: string) {
    super();
  }
}
