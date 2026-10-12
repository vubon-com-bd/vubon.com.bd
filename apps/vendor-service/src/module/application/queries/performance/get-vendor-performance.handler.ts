import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorPerformanceQuery } from './get-vendor-performance.query.js';
import {
  VENDOR_PERFORMANCE_SERVICE,
  type IVendorPerformanceService,
} from '../../services/interfaces/vendor-performance.service.interface.js';
import type { VendorPerformanceResponseDto } from '../../dtos/responses/vendor-performance-response.dto.js';

@QueryHandler(GetVendorPerformanceQuery)
export class GetVendorPerformanceHandler
  implements IQueryHandler<GetVendorPerformanceQuery, VendorPerformanceResponseDto>
{
  constructor(@Inject(VENDOR_PERFORMANCE_SERVICE) private readonly service: IVendorPerformanceService) {}
  async execute(query: GetVendorPerformanceQuery): Promise<VendorPerformanceResponseDto> {
    return this.service.getLatestByVendorId(query.vendorId);
  }
}
