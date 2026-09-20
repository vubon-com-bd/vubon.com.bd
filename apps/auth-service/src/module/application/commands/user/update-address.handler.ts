import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAddressCommand } from './update-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import type { UpdateAddressRequestDTO } from '../../dtos/requests/user/update-address.dto';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  extends BaseCommandHandler<UpdateAddressCommand, UserAddressResponseDTO>
  implements ICommandHandler<UpdateAddressCommand>
{
  readonly commandType = 'user.update-address';

  constructor(
    @Inject('UserAddressService') private readonly addressService: UserAddressServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateAddressCommand): Promise<UserAddressResponseDTO> {
    const input: UpdateAddressRequestDTO = {
      line1: command.line1,
      city: command.city,
      country: command.country,
      isDefault: command.isDefault,
      line2: command.line2,
      state: command.state,
      postalCode: command.postalCode,
      label: command.label,
    };
    return this.addressService.update(command.addressId, input);
  }
}
