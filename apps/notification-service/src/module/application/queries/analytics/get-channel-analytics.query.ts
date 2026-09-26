import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetChannelAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.channel';

  constructor(public readonly channel: string) {
    super();
  }
}
