/**
 * VerifyContactHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VerifyContactCommand } from './verify-contact.command.js';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { UserContactMapper } from '../../mappers/user-contact.mapper.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';
import {
  ContactNotFoundApplicationError,
  ContactVerificationFailedError,
  ContactAlreadyVerifiedError,
} from '../../errors/contact.errors.js';

@CommandHandler(VerifyContactCommand)
export class VerifyContactHandler
  implements ICommandHandler<VerifyContactCommand, ContactResponseDTO>
{
  constructor(
    @Inject(USER_CONTACT_REPOSITORY)
    private readonly contactRepo: UserContactRepository
  ) {}

  async execute(command: VerifyContactCommand): Promise<ContactResponseDTO> {
    const { contactId, verificationCode } = command;

    const contact = await this.contactRepo.findById(contactId);
    if (!contact) throw new ContactNotFoundApplicationError(contactId);

    if (contact.isVerified) {
      throw new ContactAlreadyVerifiedError(contactId);
    }

    // Business rule: verification code must be 6 digits
    if (!/^\d{6}$/.test(verificationCode)) {
      throw new ContactVerificationFailedError(
        contactId,
        'verification code must be 6 digits'
      );
    }

    try {
      contact.verify();
      await this.contactRepo.save(contact);
      return UserContactMapper.toResponse(contact);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ContactVerificationFailedError(contactId, reason);
    }
  }
}
