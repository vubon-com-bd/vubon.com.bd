import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserAddressQuery } from './get-user-address.query.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface.js';
import { USER_ADDRESS_SERVICE } from '../../services/interfaces/user-address.service.interface.js';

@QueryHandler(GetUserAddressQuery)
export class GetUserAddressHandler
  extends BaseQueryHandler<GetUserAddressQuery, UserAddressResponseDTO | null>
  implements IQueryHandler<GetUserAddressQuery>
{
  readonly queryType = 'user.get-address';
  constructor(@Inject(USER_ADDRESS_SERVICE) private readonly service: UserAddressServiceInterface) { super(); }
  async execute(q: GetUserAddressQuery): Promise<UserAddressResponseDTO | null> { return this.service.findById(q.addressId); }
}
