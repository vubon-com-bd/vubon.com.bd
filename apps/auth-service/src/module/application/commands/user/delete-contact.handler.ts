import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteContactCommand } from './delete-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';

@CommandHandler(DeleteContactCommand)
export class DeleteContactHandler
  extends BaseCommandHandler<DeleteContactCommand, void>
  implements ICommandHandler<DeleteContactCommand>
{
  readonly commandType = 'user.delete-contact';

  constructor(
    private readonly contactService: UserContactServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteContactCommand): Promise<void> {
    await this.contactService.delete(command.contactId);
  }
}
