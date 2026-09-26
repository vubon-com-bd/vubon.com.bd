import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetBroadcastStatsQuery } from './get-broadcast-stats.query';
import type { BroadcastResultRepository } from '../../../domain/repositories/broadcast-result.repository.interface';

export interface BroadcastStatsView {
  readonly total: number;
  readonly delivered: number;
  readonly failed: number;
}

@QueryHandler(GetBroadcastStatsQuery)
export class GetBroadcastStatsHandler
  extends BaseQueryHandler<GetBroadcastStatsQuery, BroadcastStatsView>
  implements IQueryHandler<GetBroadcastStatsQuery>
{
  readonly queryType = 'broadcast.stats';

  constructor(private readonly resultRepo: BroadcastResultRepository) {
    super();
  }

  async execute(query: GetBroadcastStatsQuery): Promise<BroadcastStatsView> {
    const results = await this.resultRepo.findByBroadcastId(query.broadcastId);
    let delivered = 0;
    let failed = 0;
    for (const r of results) {
      if (r.status.value === 'delivered' || r.status.value === 'sent') delivered++;
      if (r.status.value === 'failed') failed++;
    }
    return { total: results.length, delivered, failed };
  }
}
