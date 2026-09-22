import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyContactCommand } from './verify-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto';

@CommandHandler(VerifyContactCommand)
export class VerifyContactHandler
  extends BaseCommandHandler<VerifyContactCommand, ContactResponseDTO>
  implements ICommandHandler<VerifyContactCommand>
{
  readonly commandType = 'user.contact.verify';

  constructor(
    private readonly contactService: UserContactServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VerifyContactCommand): Promise<ContactResponseDTO> {
    void command.code;
    return this.contactService.verify(command.contactId);
  }
}
