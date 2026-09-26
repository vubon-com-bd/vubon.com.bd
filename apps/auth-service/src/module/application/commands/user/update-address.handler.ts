import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAddressCommand } from './update-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import { USER_ADDRESS_SERVICE } from '../../tokens';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  extends BaseCommandHandler<UpdateAddressCommand, UserAddressResponseDTO>
  implements ICommandHandler<UpdateAddressCommand> {
  readonly commandType = 'UpdateAddressCommand';
  constructor(
    @Inject(USER_ADDRESS_SERVICE)
    private readonly addressService: UserAddressServiceInterface,
  ) { super(); }

  async execute(command: UpdateAddressCommand): Promise<UserAddressResponseDTO> {
    const entity = await this.addressService.update(command.addressId, command.input);
    return this.addressService.toResponse(entity);
  }
}
