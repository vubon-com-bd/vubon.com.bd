import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVendorPerformanceQuery } from './list-vendor-performance.query.js';
import {
  VENDOR_PERFORMANCE_SERVICE,
  type IVendorPerformanceService,
} from '../../services/interfaces/vendor-performance.service.interface.js';
import type { VendorPerformanceResponseDto } from '../../dtos/responses/vendor-performance-response.dto.js';

@QueryHandler(ListVendorPerformanceQuery)
export class ListVendorPerformanceHandler
  implements IQueryHandler<ListVendorPerformanceQuery, readonly VendorPerformanceResponseDto[]>
{
  constructor(@Inject(VENDOR_PERFORMANCE_SERVICE) private readonly service: IVendorPerformanceService) {}
  async execute(query: ListVendorPerformanceQuery): Promise<readonly VendorPerformanceResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
