import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteAddressCommand } from './delete-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  extends BaseCommandHandler<DeleteAddressCommand, void>
  implements ICommandHandler<DeleteAddressCommand>
{
  readonly commandType = 'user.address.delete';

  constructor(
    private readonly addressService: UserAddressServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteAddressCommand): Promise<void> {
    await this.addressService.delete(command.addressId);
  }
}
