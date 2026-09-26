import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteContactCommand } from './delete-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import { USER_CONTACT_SERVICE } from '../../tokens';

@CommandHandler(DeleteContactCommand)
export class DeleteContactHandler
  extends BaseCommandHandler<DeleteContactCommand, void>
  implements ICommandHandler<DeleteContactCommand> {
  readonly commandType = 'DeleteContactCommand';
  constructor(
    @Inject(USER_CONTACT_SERVICE)
    private readonly contactService: UserContactServiceInterface,
  ) { super(); }

  async execute(command: DeleteContactCommand): Promise<void> {
    await this.contactService.remove(command.input.contactId);
  }
}
