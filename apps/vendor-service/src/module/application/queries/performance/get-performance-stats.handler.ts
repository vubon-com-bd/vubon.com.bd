import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPerformanceStatsQuery } from './get-performance-stats.query.js';
import {
  VENDOR_PERFORMANCE_SERVICE,
  type IVendorPerformanceService,
} from '../../services/interfaces/vendor-performance.service.interface.js';
import type { PerformanceStatsResponseDTO } from '../../dtos/responses/performance-response.dto.js';

@QueryHandler(GetPerformanceStatsQuery)
export class GetPerformanceStatsHandler
  implements IQueryHandler<GetPerformanceStatsQuery, PerformanceStatsResponseDTO>
{
  constructor(
    @Inject(VENDOR_PERFORMANCE_SERVICE)
    private readonly service: IVendorPerformanceService,
  ) {}

  async execute(q: GetPerformanceStatsQuery): Promise<PerformanceStatsResponseDTO> {
    return this.service.getStats(q.vendorId);
  }
}
