import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteAddressCommand } from './delete-address.command.js';
import type { UserAddressServiceInterface } from '../../services/interfaces/user-address.service.interface.js';
import { USER_ADDRESS_SERVICE } from '../../services/interfaces/user-address.service.interface.js';

export interface DeleteAddressResponse { readonly success: true; readonly deleted: boolean; }

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressHandler
  extends BaseCommandHandler<DeleteAddressCommand, DeleteAddressResponse>
  implements ICommandHandler<DeleteAddressCommand>
{
  readonly commandType = 'user.delete-address';
  constructor(@Inject(USER_ADDRESS_SERVICE) private readonly service: UserAddressServiceInterface) { super(); }

  async execute(command: DeleteAddressCommand): Promise<DeleteAddressResponse> {
    await this.service.remove(command.input.addressId);
    return { success: true, deleted: true };
  }
}
