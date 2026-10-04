/**
 * UserAddressService
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserAddressServiceInterface } from '../interfaces/user-address.service.interface.js';
import { AddAddressCommand } from '../../commands/address/add-address.command.js';
import { UpdateAddressCommand } from '../../commands/address/update-address.command.js';
import { DeleteAddressCommand } from '../../commands/address/delete-address.command.js';
import { SetDefaultAddressCommand } from '../../commands/address/set-default-address.command.js';
import { ListAddressesQuery } from '../../queries/address/list-addresses.query.js';
import { GetAddressQuery } from '../../queries/address/get-address.query.js';
import { GetDefaultAddressQuery } from '../../queries/address/get-default-address.query.js';
import type { AddAddressRequestDTO, UpdateAddressRequestDTO } from '../../dtos/requests/address/index.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import type { ListAddressesResult } from '../../queries/address/list-addresses.handler.js';

@Injectable()
export class UserAddressService implements UserAddressServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  list(userId: string): Promise<ListAddressesResult> {
    return this.queryBus.execute(new ListAddressesQuery(userId));
  }

  findById(userId: string, addressId: string): Promise<AddressResponseDTO> {
    return this.queryBus.execute(new GetAddressQuery(userId, addressId));
  }

  findDefault(userId: string): Promise<AddressResponseDTO> {
    return this.queryBus.execute(new GetDefaultAddressQuery(userId));
  }

  add(input: AddAddressRequestDTO): Promise<AddressResponseDTO> {
    return this.commandBus.execute(new AddAddressCommand(input));
  }

  update(input: UpdateAddressRequestDTO): Promise<AddressResponseDTO> {
    return this.commandBus.execute(new UpdateAddressCommand(input));
  }

  remove(userId: string, addressId: string): Promise<{ success: true }> {
    return this.commandBus.execute(new DeleteAddressCommand(userId, addressId));
  }

  setDefault(userId: string, addressId: string): Promise<AddressResponseDTO> {
    return this.commandBus.execute(new SetDefaultAddressCommand(userId, addressId));
  }
}
