import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteContactCommand } from './delete-contact.command.js';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface.js';
import { USER_CONTACT_SERVICE } from '../../services/interfaces/user-contact.service.interface.js';

export interface DeleteContactResponse { readonly success: true; readonly deleted: boolean; }

@CommandHandler(DeleteContactCommand)
export class DeleteContactHandler
  extends BaseCommandHandler<DeleteContactCommand, DeleteContactResponse>
  implements ICommandHandler<DeleteContactCommand>
{
  readonly commandType = 'user.delete-contact';
  constructor(@Inject(USER_CONTACT_SERVICE) private readonly service: UserContactServiceInterface) { super(); }

  async execute(command: DeleteContactCommand): Promise<DeleteContactResponse> {
    await this.service.remove(command.input.contactId);
    return { success: true, deleted: true };
  }
}
