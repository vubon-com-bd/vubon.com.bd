import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteAddressCommand } from './delete-address.command';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface';
import { USER_ADDRESS_SERVICE } from '../../tokens';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  extends BaseCommandHandler<DeleteAddressCommand, void>
  implements ICommandHandler<DeleteAddressCommand> {
  readonly commandType = 'DeleteAddressCommand';
  constructor(
    @Inject(USER_ADDRESS_SERVICE)
    private readonly addressService: UserAddressServiceInterface,
  ) { super(); }

  async execute(command: DeleteAddressCommand): Promise<void> {
    await this.addressService.remove(command.input.addressId);
  }
}
