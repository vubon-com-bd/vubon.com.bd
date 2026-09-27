/**
 * GetDefaultAddressHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDefaultAddressQuery } from './get-default-address.query.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAddressMapper } from '../../mappers/user-address.mapper.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import { AddressNotFoundApplicationError } from '../../errors/address.errors.js';

@QueryHandler(GetDefaultAddressQuery)
export class GetDefaultAddressHandler
  implements IQueryHandler<GetDefaultAddressQuery, AddressResponseDTO>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository
  ) {}

  async execute(query: GetDefaultAddressQuery): Promise<AddressResponseDTO> {
    const addr = await this.addressRepo.findDefaultByUserId(UserIdVO.create(query.userId));
    if (!addr) throw new AddressNotFoundApplicationError(query.userId);
    return UserAddressMapper.toResponse(addr);
  }
}
