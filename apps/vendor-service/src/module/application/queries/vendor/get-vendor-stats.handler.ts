import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorStatsQuery } from './get-vendor-stats.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorStatsResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorStatsQuery)
export class GetVendorStatsHandler
  implements IQueryHandler<GetVendorStatsQuery, VendorStatsResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: GetVendorStatsQuery): Promise<VendorStatsResponseDTO> {
    return this.service.getStats(q.filter);
  }
}
