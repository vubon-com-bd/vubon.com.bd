import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserAddressesQuery } from './list-user-addresses.query';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(ListUserAddressesQuery)
export class ListUserAddressesHandler
  extends BaseQueryHandler<ListUserAddressesQuery, readonly UserAddressResponseDTO[]>
  implements IQueryHandler<ListUserAddressesQuery>
{
  readonly queryType = 'user.list-addresses';

  constructor(private readonly addressRepo: UserAddressRepository) {
    super();
  }

  async execute(query: ListUserAddressesQuery): Promise<readonly UserAddressResponseDTO[]> {
    const entities = await this.addressRepo.findByUserId(UserIdVO.create(query.userId));
    return entities.map((entity) => ({
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
    }));
  }
}
