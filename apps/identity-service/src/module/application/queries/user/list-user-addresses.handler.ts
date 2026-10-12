import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserAddressesQuery } from './list-user-addresses.query.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface.js';
import { USER_ADDRESS_SERVICE } from '../../services/interfaces/user-address.service.interface.js';

@QueryHandler(ListUserAddressesQuery)
export class ListUserAddressesHandler
  extends BaseQueryHandler<ListUserAddressesQuery, readonly UserAddressResponseDTO[]>
  implements IQueryHandler<ListUserAddressesQuery>
{
  readonly queryType = 'user.list-addresses';
  constructor(@Inject(USER_ADDRESS_SERVICE) private readonly service: UserAddressServiceInterface) { super(); }
  async execute(q: ListUserAddressesQuery): Promise<readonly UserAddressResponseDTO[]> { return this.service.listForUser(q.userId); }
}
