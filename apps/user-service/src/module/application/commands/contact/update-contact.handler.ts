/**
 * UpdateContactHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateContactCommand } from './update-contact.command.js';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';
import { UserContactMapper } from '../../mappers/user-contact.mapper.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';
import {
  ContactNotFoundApplicationError,
  ContactUpdateFailedError,
} from '../../errors/contact.errors.js';

@CommandHandler(UpdateContactCommand)
export class UpdateContactHandler
  implements ICommandHandler<UpdateContactCommand, ContactResponseDTO>
{
  constructor(
    @Inject(USER_CONTACT_REPOSITORY)
    private readonly contactRepo: UserContactRepository
  ) {}

  async execute(command: UpdateContactCommand): Promise<ContactResponseDTO> {
    const { userId, contactId, value, isPrimary } = command;

    const contact = await this.contactRepo.findById(contactId);
    if (!contact) throw new ContactNotFoundApplicationError(contactId);

    try {
      if (value !== undefined) {
        contact.updateValue(ContactValueVO.create(value));
      }
      if (isPrimary === true) {
        await this.contactRepo.clearPrimaryForUser(UserIdVO.create(userId));
        contact.makePrimary();
      }
      await this.contactRepo.save(contact);
      return UserContactMapper.toResponse(contact);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ContactUpdateFailedError(contactId, reason);
    }
  }
}
