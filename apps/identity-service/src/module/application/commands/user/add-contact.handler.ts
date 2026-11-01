import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddContactCommand } from './add-contact.command.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface.js';
import { USER_CONTACT_SERVICE } from '../../services/interfaces/user-contact.service.interface.js';

@CommandHandler(AddContactCommand)
export class AddContactHandler
  extends BaseCommandHandler<AddContactCommand, UserContactResponseDTO>
  implements ICommandHandler<AddContactCommand>
{
  readonly commandType = 'user.add-contact';
  constructor(@Inject(USER_CONTACT_SERVICE) private readonly service: UserContactServiceInterface) { super(); }

  async execute(command: AddContactCommand): Promise<UserContactResponseDTO> {
    return this.service.add(command.userId, command.input as never);
  }
}
