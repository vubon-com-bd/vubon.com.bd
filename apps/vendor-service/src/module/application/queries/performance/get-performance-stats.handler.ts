import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPerformanceStatsQuery } from './get-performance-stats.query';
import type { VendorPerformanceRepository } from '../../../domain/repositories/vendor-performance.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';

export interface PerformanceStatsDto {
  readonly vendorId: string;
  readonly avgScore: number;
  readonly avgRating: number;
  readonly totalOrders: number;
  readonly completionRate: number;
}

@QueryHandler(GetPerformanceStatsQuery)
export class GetPerformanceStatsHandler
  extends BaseQueryHandler<GetPerformanceStatsQuery, PerformanceStatsDto>
  implements IQueryHandler<GetPerformanceStatsQuery>
{
  readonly queryType = 'vendor.performance.stats';

  constructor(private readonly performanceRepo: VendorPerformanceRepository) {
    super();
  }

  async execute(query: GetPerformanceStatsQuery): Promise<PerformanceStatsDto> {
    const p = await this.performanceRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );

    return {
      vendorId: query.vendorId,
      avgScore: p?.overallScore.numeric ?? 0,
      avgRating: p?.rating.value ?? 0,
      totalOrders: p?.totalOrders ?? 0,
      completionRate: p?.completionRate ?? 0,
    };
  }
}
