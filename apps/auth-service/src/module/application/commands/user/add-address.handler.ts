import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddAddressCommand } from './add-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import type { AddAddressRequestDTO } from '../../dtos/requests/user/add-address.dto';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  extends BaseCommandHandler<AddAddressCommand, UserAddressResponseDTO>
  implements ICommandHandler<AddAddressCommand>
{
  readonly commandType = 'user.add-address';

  constructor(
    private readonly addressService: UserAddressServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddAddressCommand): Promise<UserAddressResponseDTO> {
    const input: AddAddressRequestDTO = {
      type: command.addressType,
      line1: command.line1,
      city: command.city,
      country: command.country,
      isDefault: command.isDefault,
      isDefaultShipping: command.isDefaultShipping,
      isDefaultBilling: command.isDefaultBilling,
      line2: command.line2,
      state: command.state,
      postalCode: command.postalCode,
      label: command.label,
    };
    return this.addressService.add(command.userId, input);
  }
}
