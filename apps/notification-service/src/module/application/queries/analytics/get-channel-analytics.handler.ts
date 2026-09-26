import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetChannelAnalyticsQuery } from './get-channel-analytics.query';

export interface ChannelAnalyticsView {
  readonly channel: string;
  readonly sent: number;
  readonly delivered: number;
  readonly failed: number;
}

@QueryHandler(GetChannelAnalyticsQuery)
export class GetChannelAnalyticsHandler
  extends BaseQueryHandler<GetChannelAnalyticsQuery, ChannelAnalyticsView>
  implements IQueryHandler<GetChannelAnalyticsQuery>
{
  readonly queryType = 'analytics.channel';

  async execute(query: GetChannelAnalyticsQuery): Promise<ChannelAnalyticsView> {
    return {
      channel: query.channel,
      sent: 0,
      delivered: 0,
      failed: 0,
    };
  }
}
