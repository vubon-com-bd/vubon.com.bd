import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRealTimeAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-real-time';

  constructor(public readonly windowMinutes: number = 5) {
    super();
  }
}
