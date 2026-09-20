import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddContactCommand } from './add-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';

@CommandHandler(AddContactCommand)
export class AddContactHandler
  extends BaseCommandHandler<AddContactCommand, UserContactResponseDTO>
  implements ICommandHandler<AddContactCommand>
{
  readonly commandType = 'user.add-contact';

  constructor(
    @Inject('UserContactService') private readonly contactService: UserContactServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddContactCommand): Promise<UserContactResponseDTO> {
    return this.contactService.add(command.userId, {
      phone: command.phone,
      email: command.email,
    } as never);
  }
}
