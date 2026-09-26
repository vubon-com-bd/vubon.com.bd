import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTopVendorsQuery } from './get-top-vendors.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@QueryHandler(GetTopVendorsQuery)
export class GetTopVendorsHandler
  extends BaseQueryHandler<GetTopVendorsQuery, readonly VendorResponseDto[]>
  implements IQueryHandler<GetTopVendorsQuery>
{
  readonly queryType = 'vendor.analytics.top-vendors';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: GetTopVendorsQuery): Promise<readonly VendorResponseDto[]> {
    void query.limit;
    const vendors = await this.vendorRepo.findAll();
    return vendors.slice(0, query.limit).map((vendor) => ({
      id: vendor.id.value,
      ownerId: vendor.ownerId.value,
      name: vendor.name.value,
      slug: vendor.slug.value,
      status: vendor.status.value,
      type: vendor.type.value,
      tier: vendor.tier.value,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    }));
  }
}
