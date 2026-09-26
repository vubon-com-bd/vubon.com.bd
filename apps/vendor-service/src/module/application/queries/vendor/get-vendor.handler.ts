import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVendorQuery } from './get-vendor.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@QueryHandler(GetVendorQuery)
export class GetVendorHandler
  extends BaseQueryHandler<GetVendorQuery, VendorResponseDto>
  implements IQueryHandler<GetVendorQuery>
{
  readonly queryType = 'vendor.get';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: GetVendorQuery): Promise<VendorResponseDto> {
    const vendor = await this.vendorRepo.findById(VendorIdVO.create(query.vendorId));
    if (!vendor) throw new VendorNotFoundAppError(query.vendorId);

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
