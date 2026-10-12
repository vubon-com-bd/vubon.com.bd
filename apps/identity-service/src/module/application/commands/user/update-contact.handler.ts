import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateContactCommand } from './update-contact.command.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface.js';
import { USER_CONTACT_SERVICE } from '../../services/interfaces/user-contact.service.interface.js';

@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler
  extends BaseCommandHandler<UpdateContactCommand, UserContactResponseDTO>
  implements ICommandHandler<UpdateContactCommand>
{
  readonly commandType = 'user.update-contact';
  constructor(@Inject(USER_CONTACT_SERVICE) private readonly service: UserContactServiceInterface) { super(); }

  async execute(command: UpdateContactCommand): Promise<UserContactResponseDTO> {
    return this.service.update(command.contactId, command.input as never);
  }
}
