import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateContactCommand } from './update-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';

@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler
  extends BaseCommandHandler<UpdateContactCommand, void>
  implements ICommandHandler<UpdateContactCommand>
{
  readonly commandType = 'user.update-contact';

  constructor(
    @Inject('UserContactService') private readonly contactService: UserContactServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateContactCommand): Promise<void> {
    void command;
    void this.contactService;
    throw new Error('update-contact not yet wired');
  }
}
