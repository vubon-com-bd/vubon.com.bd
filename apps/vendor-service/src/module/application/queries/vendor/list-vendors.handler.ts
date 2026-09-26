import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListVendorsQuery } from './list-vendors.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@QueryHandler(ListVendorsQuery)
export class ListVendorsHandler
  extends BaseQueryHandler<ListVendorsQuery, readonly VendorResponseDto[]>
  implements IQueryHandler<ListVendorsQuery>
{
  readonly queryType = 'vendor.list';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: ListVendorsQuery): Promise<readonly VendorResponseDto[]> {
    void query;
    const vendors = await this.vendorRepo.findAll();
    return vendors.map((vendor) => ({
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
