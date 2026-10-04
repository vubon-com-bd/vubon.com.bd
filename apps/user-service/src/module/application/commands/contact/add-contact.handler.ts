/**
 * AddContactHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddContactCommand } from './add-contact.command.js';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactValidationService } from '@domain/services/contact-validation.service';
import { UserContactMapper } from '../../mappers/user-contact.mapper.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';
import {
  ContactCreationFailedError,
  ContactLimitExceededError,
} from '../../errors/contact.errors.js';
import { UserNotFoundApplicationError } from '../../errors/user.errors.js';

const MAX_CONTACTS = 10;

@CommandHandler(AddContactCommand)
export class AddContactHandler
  implements ICommandHandler<AddContactCommand, ContactResponseDTO>
{
  constructor(
    @Inject(USER_CONTACT_REPOSITORY)
    private readonly contactRepo: UserContactRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: AddContactCommand): Promise<ContactResponseDTO> {
    const payload = command.payload;
    const userIdVO = UserIdVO.create(payload.userId);

    const user = await this.userRepo.findById(userIdVO.value);
    if (!user) throw new UserNotFoundApplicationError(payload.userId);

    const count = await this.contactRepo.countByUserId(userIdVO);
    if (count >= MAX_CONTACTS) {
      throw new ContactLimitExceededError(count, MAX_CONTACTS);
    }

    try {
      const now = new Date().toISOString();
      const typeVO = ContactTypeVO.create(payload.type);
      const contactValueVO = ContactValueVO.create(payload.value);

      // Business validation: contact value must match its type
      ContactValidationService.validateForType(typeVO, contactValueVO);

      const contact = UserContactEntity.create({
        contactId: ContactIdVO.create(crypto.randomUUID()),
        userId: userIdVO,
        type: typeVO,
        contactValue: contactValueVO,
        isPrimary: payload.isPrimary ?? false,
        now,
      });

      if (payload.isPrimary === true) {
        await this.contactRepo.clearPrimaryForUser(userIdVO);
        contact.makePrimary();
      }

      await this.contactRepo.save(contact);
      return UserContactMapper.toResponse(contact);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new ContactCreationFailedError(reason);
    }
  }
}
