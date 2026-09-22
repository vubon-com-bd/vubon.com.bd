import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVendorAnalyticsQuery } from './get-vendor-analytics.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VendorAnalyticsResponseDto } from '../../dtos/responses/vendor-analytics-response.dto';

@QueryHandler(GetVendorAnalyticsQuery)
export class GetVendorAnalyticsHandler
  extends BaseQueryHandler<GetVendorAnalyticsQuery, VendorAnalyticsResponseDto>
  implements IQueryHandler<GetVendorAnalyticsQuery>
{
  readonly queryType = 'vendor.analytics.get';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: GetVendorAnalyticsQuery): Promise<VendorAnalyticsResponseDto> {
    const vendor = await this.vendorRepo.findById(
      VendorIdVO.create(query.vendorId),
    );
    if (!vendor) throw new VendorNotFoundAppError(query.vendorId);

    const now = new Date();
    const start = query.periodStart ?? new Date(now.getTime() - 30 * 86400000).toISOString();
    const end = query.periodEnd ?? now.toISOString();

    return {
      vendorId: query.vendorId,
      periodStart: start,
      periodEnd: end,
      ordersTrend: [],
      revenueTrend: [],
      topProducts: [],
    };
  }
}
