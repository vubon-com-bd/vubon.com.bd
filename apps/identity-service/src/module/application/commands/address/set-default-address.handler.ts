import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetDefaultAddressCommand } from './set-default-address.command.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface.js';
import { USER_ADDRESS_SERVICE } from '../../services/interfaces/user-address.service.interface.js';

@CommandHandler(SetDefaultAddressCommand)
export class SetDefaultAddressHandler
  extends BaseCommandHandler<SetDefaultAddressCommand, UserAddressResponseDTO | null>
  implements ICommandHandler<SetDefaultAddressCommand>
{
  readonly commandType = 'user.set-default-address';
  constructor(@Inject(USER_ADDRESS_SERVICE) private readonly service: UserAddressServiceInterface) { super(); }
  async execute(command: SetDefaultAddressCommand): Promise<UserAddressResponseDTO | null> {
    await this.service.setDefault(command.addressId, command.scope);
    return this.service.findById(command.addressId);
  }
}
