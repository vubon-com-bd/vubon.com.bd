import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTrafficAnalyticsQuery } from './get-traffic-analytics.query';
import type { TrafficSourceRepository } from '../../../domain/repositories/traffic-source.repository.interface';

export interface TrafficAnalyticsView {
  readonly topSources: readonly {
    readonly source: string;
    readonly sessions: number;
  }[];
  readonly fromDate: string;
  readonly toDate: string;
}

@QueryHandler(GetTrafficAnalyticsQuery)
export class GetTrafficAnalyticsHandler
  extends BaseQueryHandler<GetTrafficAnalyticsQuery, TrafficAnalyticsView>
  implements IQueryHandler<GetTrafficAnalyticsQuery>
{
  readonly queryType = 'analytics.get-traffic';

  constructor(private readonly trafficRepo: TrafficSourceRepository) {
    super();
  }

  async execute(query: GetTrafficAnalyticsQuery): Promise<TrafficAnalyticsView> {
    const top = await this.trafficRepo.findTopBySessions(20);
    return {
      topSources: top.map((t) => ({
        source: t.source?.value ?? 'direct',
        sessions: t.sessions,
      })),
      fromDate: query.fromDate,
      toDate: query.toDate,
    };
  }
}
