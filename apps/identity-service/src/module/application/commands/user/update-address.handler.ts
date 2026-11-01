import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAddressCommand } from './update-address.command.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface.js';
import { USER_ADDRESS_SERVICE } from '../../services/interfaces/user-address.service.interface.js';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  extends BaseCommandHandler<UpdateAddressCommand, UserAddressResponseDTO>
  implements ICommandHandler<UpdateAddressCommand>
{
  readonly commandType = 'user.update-address';
  constructor(@Inject(USER_ADDRESS_SERVICE) private readonly service: UserAddressServiceInterface) { super(); }

  async execute(command: UpdateAddressCommand): Promise<UserAddressResponseDTO> {
    return this.service.update(command.addressId, command.input as never);
  }
}
