import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorAnalyticsQuery } from './get-vendor-analytics.query.js';
import {
  VENDOR_PERFORMANCE_SERVICE,
  type IVendorPerformanceService,
} from '../../services/interfaces/vendor-performance.service.interface.js';
import type { PerformanceResponseDTO } from '../../dtos/responses/performance-response.dto.js';

/**
 * Simplified: returns latest performance snapshot as analytics view.
 * Full implementation would aggregate metrics over the requested period.
 */
@QueryHandler(GetVendorAnalyticsQuery)
export class GetVendorAnalyticsHandler
  implements IQueryHandler<GetVendorAnalyticsQuery, PerformanceResponseDTO | null>
{
  constructor(
    @Inject(VENDOR_PERFORMANCE_SERVICE)
    private readonly service: IVendorPerformanceService,
  ) {}

  async execute(q: GetVendorAnalyticsQuery): Promise<PerformanceResponseDTO | null> {
    return this.service.getLatest(q.vendorId);
  }
}
