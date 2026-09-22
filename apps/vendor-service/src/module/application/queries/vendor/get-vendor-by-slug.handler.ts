import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVendorBySlugQuery } from './get-vendor-by-slug.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorSlugVO } from '../../../domain/value-objects/primitives/vendor-slug.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@QueryHandler(GetVendorBySlugQuery)
export class GetVendorBySlugHandler
  extends BaseQueryHandler<GetVendorBySlugQuery, VendorResponseDto>
  implements IQueryHandler<GetVendorBySlugQuery>
{
  readonly queryType = 'vendor.get-by-slug';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: GetVendorBySlugQuery): Promise<VendorResponseDto> {
    const vendor = await this.vendorRepo.findBySlug(VendorSlugVO.create(query.slug));
    if (!vendor) throw new VendorNotFoundAppError(query.slug);

    return {
      id: vendor.id.value,
      ownerId: vendor.ownerId.value,
      name: vendor.name.value,
      slug: vendor.slug.value,
      status: vendor.status.value,
      type: vendor.type.value,
      tier: vendor.tier.value,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }
}
