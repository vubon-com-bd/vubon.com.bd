/**
 * SetDefaultAddressHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetDefaultAddressCommand } from './set-default-address.command.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAddressMapper } from '../../mappers/user-address.mapper.js';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto.js';
import {
  AddressNotFoundApplicationError,
  AddressUpdateFailedError,
} from '../../errors/address.errors.js';

@CommandHandler(SetDefaultAddressCommand)
export class SetDefaultAddressHandler
  implements ICommandHandler<SetDefaultAddressCommand, AddressResponseDTO>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository
  ) {}

  async execute(command: SetDefaultAddressCommand): Promise<AddressResponseDTO> {
    const { userId, addressId } = command;

    const address = await this.addressRepo.findById(addressId);
    if (!address) throw new AddressNotFoundApplicationError(addressId);

    try {
      await this.addressRepo.clearDefaultForUser(UserIdVO.create(userId));
      address.makeDefault();
      await this.addressRepo.save(address);
      return UserAddressMapper.toResponse(address);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new AddressUpdateFailedError(addressId, reason);
    }
  }
}
