/**
 * GetAddressHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAddressQuery } from './get-address.query.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { UserAddressMapper } from '../../mappers/user-address.mapper.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import { AddressNotFoundApplicationError } from '../../errors/address.errors.js';

@QueryHandler(GetAddressQuery)
export class GetAddressHandler
  implements IQueryHandler<GetAddressQuery, AddressResponseDTO>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository
  ) {}

  async execute(query: GetAddressQuery): Promise<AddressResponseDTO> {
    const addr = await this.addressRepo.findById(query.addressId);
    if (!addr) throw new AddressNotFoundApplicationError(query.addressId);
    return UserAddressMapper.toResponse(addr);
  }
}
