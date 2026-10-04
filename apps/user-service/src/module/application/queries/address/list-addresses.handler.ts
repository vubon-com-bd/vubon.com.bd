/**
 * ListAddressesHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListAddressesQuery } from './list-addresses.query.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAddressMapper } from '../../mappers/user-address.mapper.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';

export interface ListAddressesResult {
  readonly items: readonly AddressResponseDTO[];
  readonly total: number;
}

@QueryHandler(ListAddressesQuery)
export class ListAddressesHandler
  implements IQueryHandler<ListAddressesQuery, ListAddressesResult>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository
  ) {}

  async execute(query: ListAddressesQuery): Promise<ListAddressesResult> {
    const items = await this.addressRepo.findByUserId(UserIdVO.create(query.userId));
    return {
      items: UserAddressMapper.toResponseList(items),
      total: items.length,
    };
  }
}
