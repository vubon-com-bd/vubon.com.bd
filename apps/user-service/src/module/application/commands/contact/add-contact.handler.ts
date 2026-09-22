import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddContactCommand } from './add-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto';

@CommandHandler(AddContactCommand)
export class AddContactHandler
  extends BaseCommandHandler<AddContactCommand, ContactResponseDTO>
  implements ICommandHandler<AddContactCommand>
{
  readonly commandType = 'user.contact.add';

  constructor(
    private readonly contactService: UserContactServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddContactCommand): Promise<ContactResponseDTO> {
    return this.contactService.add(command.userId, {
      type: command.contactType,
      value: command.value,
    });
  }
}
