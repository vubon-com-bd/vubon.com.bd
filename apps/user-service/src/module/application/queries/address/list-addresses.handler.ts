import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAddressesQuery } from './list-addresses.query';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto';

@QueryHandler(ListAddressesQuery)
export class ListAddressesHandler
  extends BaseQueryHandler<ListAddressesQuery, readonly AddressResponseDTO[]>
  implements IQueryHandler<ListAddressesQuery>
{
  readonly queryType = 'user.address.list';

  constructor(private readonly addressService: UserAddressServiceInterface) {
    super();
  }

  async execute(query: ListAddressesQuery): Promise<readonly AddressResponseDTO[]> {
    return this.addressService.listByUser(query.userId);
  }
}
