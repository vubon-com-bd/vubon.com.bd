/**
 * GetContactHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetContactQuery } from './get-contact.query.js';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { UserContactMapper } from '../../mappers/user-contact.mapper.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';
import { ContactNotFoundApplicationError } from '../../errors/contact.errors.js';

@QueryHandler(GetContactQuery)
export class GetContactHandler
  implements IQueryHandler<GetContactQuery, ContactResponseDTO>
{
  constructor(
    @Inject(USER_CONTACT_REPOSITORY)
    private readonly contactRepo: UserContactRepository
  ) {}

  async execute(query: GetContactQuery): Promise<ContactResponseDTO> {
    const c = await this.contactRepo.findById(query.contactId);
    if (!c) throw new ContactNotFoundApplicationError(query.contactId);
    return UserContactMapper.toResponse(c);
  }
}
