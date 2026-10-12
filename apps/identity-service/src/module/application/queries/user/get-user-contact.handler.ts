import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserContactQuery } from './get-user-contact.query.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface.js';
import { USER_CONTACT_REPOSITORY } from '../../../domain/repositories/user-contact.repository.interface.js';
import { ContactNotFoundError } from '../../../domain/errors/profile.errors.js';

@QueryHandler(GetUserContactQuery)
export class GetUserContactHandler
  extends BaseQueryHandler<GetUserContactQuery, UserContactResponseDTO>
  implements IQueryHandler<GetUserContactQuery>
{
  readonly queryType = 'user.get-contact';
  constructor(@Inject(USER_CONTACT_REPOSITORY) private readonly repo: UserContactRepository) { super(); }
  async execute(q: GetUserContactQuery): Promise<UserContactResponseDTO> {
    const c = await this.repo.findById(q.contactId);
    if (!c) throw new ContactNotFoundError(q.contactId);
    return {
      id: c.id, userId: c.userId.value, contactType: c.contactType,
      contactValue: c.contactValue, label: c.label, isPrimary: c.isPrimary,
      isVerified: c.isVerified, verifiedAt: c.verifiedAt, createdAt: c.createdAt,
    };
  }
}
