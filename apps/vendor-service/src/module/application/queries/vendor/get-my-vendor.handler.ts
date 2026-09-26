import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMyVendorQuery } from './get-my-vendor.query';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@QueryHandler(GetMyVendorQuery)
export class GetMyVendorHandler
  extends BaseQueryHandler<GetMyVendorQuery, VendorResponseDto>
  implements IQueryHandler<GetMyVendorQuery>
{
  readonly queryType = 'vendor.get-my';

  constructor(private readonly vendorRepo: VendorRepository) {
    super();
  }

  async execute(query: GetMyVendorQuery): Promise<VendorResponseDto> {
    const vendor = await this.vendorRepo.findByOwnerId(UserIdVO.create(query.ownerId));
    if (!vendor) throw new VendorNotFoundAppError(query.ownerId);

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
