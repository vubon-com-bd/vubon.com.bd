import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetDefaultAddressCommand } from './set-default-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';

@CommandHandler(SetDefaultAddressCommand)
export class SetDefaultAddressHandler
  extends BaseCommandHandler<SetDefaultAddressCommand, void>
  implements ICommandHandler<SetDefaultAddressCommand>
{
  readonly commandType = 'user.address.set-default';

  constructor(
    private readonly addressService: UserAddressServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SetDefaultAddressCommand): Promise<void> {
    await this.addressService.setDefault(command.userId, command.addressId);
  }
}
