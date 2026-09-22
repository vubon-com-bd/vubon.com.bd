import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVendorStatsQuery } from './get-vendor-stats.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VendorStatsResponseDto } from '../../dtos/responses/vendor-stats-response.dto';

@QueryHandler(GetVendorStatsQuery)
export class GetVendorStatsHandler
  extends BaseQueryHandler<GetVendorStatsQuery, VendorStatsResponseDto>
  implements IQueryHandler<GetVendorStatsQuery>
{
  readonly queryType = 'vendor.get-stats';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: GetVendorStatsQuery): Promise<VendorStatsResponseDto> {
    const vendor = await this.vendorRepo.findById(VendorIdVO.create(query.vendorId));
    if (!vendor) throw new VendorNotFoundAppError(query.vendorId);

    return {
      vendorId: query.vendorId,
      totalOrders: 0,
      totalRevenue: 0,
      totalCommission: 0,
      totalPayout: 0,
      averageRating: 0,
      activeProducts: 0,
      pendingReviews: 0,
    };
  }
}
