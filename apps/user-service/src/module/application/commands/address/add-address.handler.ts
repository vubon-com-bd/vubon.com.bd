import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddAddressCommand } from './add-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto';

@CommandHandler(AddAddressCommand)
export class AddAddressHandler
  extends BaseCommandHandler<AddAddressCommand, AddressResponseDTO>
  implements ICommandHandler<AddAddressCommand>
{
  readonly commandType = 'user.address.add';

  constructor(
    private readonly addressService: UserAddressServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddAddressCommand): Promise<AddressResponseDTO> {
    return this.addressService.add(command.userId, {
      line1: command.line1,
      city: command.city,
      district: command.district,
      division: command.division,
      country: command.country,
      isDefault: command.isDefault,
      line2: command.line2,
      postalCode: command.postalCode,
      label: command.label,
    });
  }
}
