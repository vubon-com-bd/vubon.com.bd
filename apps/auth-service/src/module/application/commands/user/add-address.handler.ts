import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddAddressCommand } from './add-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import { USER_ADDRESS_SERVICE } from '../../tokens';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  extends BaseCommandHandler<AddAddressCommand, UserAddressResponseDTO>
  implements ICommandHandler<AddAddressCommand> {
  readonly commandType = 'AddAddressCommand';
  constructor(
    @Inject(USER_ADDRESS_SERVICE)
    private readonly addressService: UserAddressServiceInterface,
  ) { super(); }

  async execute(command: AddAddressCommand): Promise<UserAddressResponseDTO> {
    const entity = await this.addressService.add(command.userId, command.input);
    return this.addressService.toResponse(entity);
  }
}
