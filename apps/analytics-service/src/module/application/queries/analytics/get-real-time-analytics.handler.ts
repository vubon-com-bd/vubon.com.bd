import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRealTimeAnalyticsQuery } from './get-real-time-analytics.query';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface';

export interface RealTimeAnalyticsView {
  readonly activeSessions: number;
  readonly eventsLastWindow: number;
  readonly windowMinutes: number;
  readonly asOf: string;
}

@QueryHandler(GetRealTimeAnalyticsQuery)
export class GetRealTimeAnalyticsHandler
  extends BaseQueryHandler<GetRealTimeAnalyticsQuery, RealTimeAnalyticsView>
  implements IQueryHandler<GetRealTimeAnalyticsQuery>
{
  readonly queryType = 'analytics.get-real-time';

  constructor(
    private readonly eventRepo: EventRepository,
    private readonly sessionRepo: SessionRepository,
  ) {
    super();
  }

  async execute(
    query: GetRealTimeAnalyticsQuery,
  ): Promise<RealTimeAnalyticsView> {
    const sinceMs = Date.now() - query.windowMinutes * 60_000;
    const events = await this.eventRepo.findAll();
    const recent = events.filter((e) => e.timestamp.epochMs >= sinceMs);
    const activeSessions = await this.sessionRepo.findActive();

    return {
      activeSessions: activeSessions.length,
      eventsLastWindow: recent.length,
      windowMinutes: query.windowMinutes,
      asOf: new Date().toISOString(),
    };
  }
}
