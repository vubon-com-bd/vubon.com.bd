import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPerformanceQuery } from './get-performance.query.js';
import {
  VENDOR_PERFORMANCE_SERVICE,
  type IVendorPerformanceService,
} from '../../services/interfaces/vendor-performance.service.interface.js';
import type { PerformanceResponseDTO } from '../../dtos/responses/performance-response.dto.js';

@QueryHandler(GetPerformanceQuery)
export class GetPerformanceHandler
  implements IQueryHandler<GetPerformanceQuery, PerformanceResponseDTO | null>
{
  constructor(
    @Inject(VENDOR_PERFORMANCE_SERVICE)
    private readonly service: IVendorPerformanceService,
  ) {}

  async execute(q: GetPerformanceQuery): Promise<PerformanceResponseDTO | null> {
    return this.service.getLatest(q.vendorId);
  }
}
