import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserAnalyticsQuery } from './get-user-analytics.query';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

export interface UserAnalyticsView {
  readonly userId: string;
  readonly totalSessions: number;
  readonly totalEvents: number;
  readonly fromDate: string;
  readonly toDate: string;
}

@QueryHandler(GetUserAnalyticsQuery)
export class GetUserAnalyticsHandler
  extends BaseQueryHandler<GetUserAnalyticsQuery, UserAnalyticsView>
  implements IQueryHandler<GetUserAnalyticsQuery>
{
  readonly queryType = 'analytics.get-user';

  constructor(
    private readonly eventRepo: EventRepository,
    private readonly sessionRepo: SessionRepository,
  ) {
    super();
  }

  async execute(query: GetUserAnalyticsQuery): Promise<UserAnalyticsView> {
    const sessions = await this.sessionRepo.findByUser(UserIdVO.create(query.userId));
    const allEvents = await this.eventRepo.findAll();
    const fromMs = new Date(query.fromDate).getTime();
    const toMs = new Date(query.toDate).getTime();
    const eventsInRange = allEvents.filter((e) => {
      const ms = e.timestamp.epochMs;
      return ms >= fromMs && ms <= toMs;
    });

    return {
      userId: query.userId,
      totalSessions: sessions.length,
      totalEvents: eventsInRange.length,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
  }
}
