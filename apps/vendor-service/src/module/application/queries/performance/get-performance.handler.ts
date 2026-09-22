import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPerformanceQuery } from './get-performance.query';
import type { VendorPerformanceRepository } from '../../../domain/repositories/vendor-performance.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { PerformanceResponseDto } from '../../dtos/responses/performance-response.dto';

@QueryHandler(GetPerformanceQuery)
export class GetPerformanceHandler
  extends BaseQueryHandler<GetPerformanceQuery, PerformanceResponseDto>
  implements IQueryHandler<GetPerformanceQuery>
{
  readonly queryType = 'vendor.performance.get';

  constructor(private readonly performanceRepo: VendorPerformanceRepository) {
    super();
  }

  async execute(query: GetPerformanceQuery): Promise<PerformanceResponseDto> {
    const p = await this.performanceRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    if (!p) throw new VendorNotFoundAppError(query.vendorId);

    return {
      id: p.id.value,
      vendorId: p.vendorId.value,
      overallScore: p.overallScore.numeric,
      rating: p.rating.value,
      totalOrders: p.totalOrders,
      completedOrders: p.completedOrders,
      cancelledOrders: p.cancelledOrders,
      avgResponseTimeHours: p.avgResponseTimeHours,
      onTimeDeliveryRate: p.onTimeDeliveryRate,
      completionRate: p.completionRate,
      periodStart: p.periodStart.toISOString(),
      periodEnd: p.periodEnd.toISOString(),
    };
  }
}
