import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorStatsQuery } from './get-vendor-stats.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorStatsResponseDto } from '../../dtos/responses/vendor-stats-response.dto.js';

@QueryHandler(GetVendorStatsQuery)
export class GetVendorStatsHandler implements IQueryHandler<GetVendorStatsQuery, VendorStatsResponseDto> {
  constructor(@Inject(VENDOR_SERVICE) private readonly service: IVendorService) {}
  async execute(query: GetVendorStatsQuery): Promise<VendorStatsResponseDto> {
    return this.service.getStats(query.vendorId);
  }
}
