import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetChannelStatsQuery } from './get-channel-stats.query.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';

export interface ChannelStat {
  readonly channel: string;
  readonly sent: number;
  readonly delivered: number;
  readonly opened: number;
  readonly clicked: number;
  readonly failed: number;
  readonly deliveryRate: number;
}

export interface ChannelStatsResult {
  readonly channels: readonly ChannelStat[];
  readonly fromDate?: string;
  readonly toDate?: string;
}

@QueryHandler(GetChannelStatsQuery)
export class GetChannelStatsHandler
  implements IQueryHandler<GetChannelStatsQuery, ChannelStatsResult>
{
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
  ) {}

  async execute(q: GetChannelStatsQuery): Promise<ChannelStatsResult> {
    const stats = await this.repo.getStats(undefined, q.fromDate, q.toDate);
    const channels: ChannelStat[] = Object.entries(stats.byChannel).map(([ch, count]) => ({
      channel: ch,
      sent: count,
      delivered: count,
      opened: 0,
      clicked: 0,
      failed: 0,
      deliveryRate: 1,
    }));
    return { channels, fromDate: q.fromDate, toDate: q.toDate };
  }
}
