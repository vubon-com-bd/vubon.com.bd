import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateContactCommand } from './update-contact.command';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { USER_CONTACT_SERVICE } from '../../tokens';

@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler
  extends BaseCommandHandler<UpdateContactCommand, UserContactResponseDTO>
  implements ICommandHandler<UpdateContactCommand> {
  readonly commandType = 'UpdateContactCommand';
  constructor(
    @Inject(USER_CONTACT_SERVICE)
    private readonly contactService: UserContactServiceInterface,
  ) { super(); }

  async execute(command: UpdateContactCommand): Promise<UserContactResponseDTO> {
    const entity = await this.contactService.update(command.input);
    return this.contactService.toResponse(entity);
  }
}
