import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetLatestVendorStatsQuery } from './get-latest-vendor-stats.query.js';
import {
  VENDOR_STATS_SERVICE,
  type IVendorStatsService,
  type VendorStatsDto,
} from '../../services/interfaces/vendor-stats.service.interface.js';

@QueryHandler(GetLatestVendorStatsQuery)
export class GetLatestVendorStatsHandler
  implements IQueryHandler<GetLatestVendorStatsQuery, VendorStatsDto | null>
{
  constructor(@Inject(VENDOR_STATS_SERVICE) private readonly service: IVendorStatsService) {}
  async execute(query: GetLatestVendorStatsQuery): Promise<VendorStatsDto | null> {
    return this.service.getLatestByVendorId(query.vendorId);
  }
}
