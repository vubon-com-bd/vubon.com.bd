import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserAddressQuery } from './get-user-address.query';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import { AddressIdVO } from '../../../domain/value-objects/primitives/address-id.vo';

@QueryHandler(GetUserAddressQuery)
export class GetUserAddressHandler
  extends BaseQueryHandler<GetUserAddressQuery, UserAddressResponseDTO | null>
  implements IQueryHandler<GetUserAddressQuery>
{
  readonly queryType = 'user.get-address';

  constructor(@Inject('UserAddressRepository') private readonly addressRepo: UserAddressRepository) {
    super();
  }

  async execute(query: GetUserAddressQuery): Promise<UserAddressResponseDTO | null> {
    const entity = await this.addressRepo.findById(AddressIdVO.create(query.addressId));
    if (!entity) return null;
    return {
      success: true,
      address: {
        id: entity.id.value,
        userId: entity.userId.value,
        type: 'home',
        label: entity.label,
        line1: entity.addressLine,
        city: entity.district,
        state: entity.division,
        country: 'BD',
        isDefault: entity.isDefault,
        isDefaultShipping: entity.isDefault,
        isDefaultBilling: false,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
