import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAddressCommand } from './update-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import type { AddressResponseDTO } from '../../dtos/responses/address-response.dto';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressHandler
  extends BaseCommandHandler<UpdateAddressCommand, AddressResponseDTO>
  implements ICommandHandler<UpdateAddressCommand>
{
  readonly commandType = 'user.address.update';

  constructor(
    private readonly addressService: UserAddressServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateAddressCommand): Promise<AddressResponseDTO> {
    return this.addressService.update(command.addressId, {
      line1: command.line1,
      line2: command.line2,
      city: command.city,
      district: command.district,
      division: command.division,
      postalCode: command.postalCode,
      label: command.label,
      isDefault: command.isDefault,
    });
  }
}
