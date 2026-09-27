/**
 * DeleteAddressHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAddressCommand } from './delete-address.command.js';
import { USER_ADDRESS_REPOSITORY } from '@domain/repositories/user-address.repository.interface';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { AddressNotFoundApplicationError } from '../../errors/address.errors.js';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  implements ICommandHandler<DeleteAddressCommand, { success: true }>
{
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly addressRepo: UserAddressRepository
  ) {}

  async execute(command: DeleteAddressCommand): Promise<{ success: true }> {
    const existing = await this.addressRepo.findById(command.addressId);
    if (!existing) throw new AddressNotFoundApplicationError(command.addressId);
    await this.addressRepo.delete(command.addressId);
    return { success: true };
  }
}
