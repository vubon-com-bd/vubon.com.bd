/**
 * DeleteContactHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteContactCommand } from './delete-contact.command.js';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { ContactNotFoundApplicationError } from '../../errors/contact.errors.js';

@CommandHandler(DeleteContactCommand)
export class DeleteContactHandler
  implements ICommandHandler<DeleteContactCommand, { success: true }>
{
  constructor(
    @Inject(USER_CONTACT_REPOSITORY)
    private readonly contactRepo: UserContactRepository
  ) {}

  async execute(command: DeleteContactCommand): Promise<{ success: true }> {
    const existing = await this.contactRepo.findById(command.contactId);
    if (!existing) throw new ContactNotFoundApplicationError(command.contactId);
    await this.contactRepo.delete(command.contactId);
    return { success: true };
  }
}
