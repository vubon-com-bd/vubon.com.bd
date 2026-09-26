import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserContactQuery } from './get-user-contact.query';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { USER_CONTACT_REPO } from '../../tokens';

@QueryHandler(GetUserContactQuery)
export class GetUserContactHandler
  extends BaseQueryHandler<GetUserContactQuery, UserContactResponseDTO | null>
  implements IQueryHandler<GetUserContactQuery> {
  readonly queryType = 'GetUserContactQuery';
  constructor(
    @Inject(USER_CONTACT_REPO) private readonly repo: UserContactRepository,
  ) { super(); }

  async execute(
    query: GetUserContactQuery,
  ): Promise<UserContactResponseDTO | null> {
    const c = await this.repo.findById(query.contactId);
    if (!c) return null;
    return {
      id: c.id,
      userId: c.userId,
      email: c.email?.value,
      phone: c.phone?.value,
      verified: c.verified,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  }
}
