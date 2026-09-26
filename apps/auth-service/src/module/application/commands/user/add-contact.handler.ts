import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddContactCommand } from './add-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { USER_CONTACT_SERVICE } from '../../tokens';

@CommandHandler(AddContactCommand)
export class AddContactHandler
  extends BaseCommandHandler<AddContactCommand, UserContactResponseDTO>
  implements ICommandHandler<AddContactCommand> {
  readonly commandType = 'AddContactCommand';
  constructor(
    @Inject(USER_CONTACT_SERVICE)
    private readonly contactService: UserContactServiceInterface,
  ) { super(); }

  async execute(command: AddContactCommand): Promise<UserContactResponseDTO> {
    const entity = await this.contactService.add(command.userId, command.input);
    return this.contactService.toResponse(entity);
  }
}
