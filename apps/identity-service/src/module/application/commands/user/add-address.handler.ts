import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddAddressCommand } from './add-address.command.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface.js';
import { USER_ADDRESS_SERVICE } from '../../services/interfaces/user-address.service.interface.js';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  extends BaseCommandHandler<AddAddressCommand, UserAddressResponseDTO>
  implements ICommandHandler<AddAddressCommand>
{
  readonly commandType = 'user.add-address';
  constructor(@Inject(USER_ADDRESS_SERVICE) private readonly service: UserAddressServiceInterface) { super(); }

  async execute(command: AddAddressCommand): Promise<UserAddressResponseDTO> {
    return this.service.add(command.userId, command.input as never);
  }
}
