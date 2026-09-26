import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserContactsQuery } from './list-user-contacts.query';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { USER_CONTACT_REPO } from '../../tokens';

@QueryHandler(ListUserContactsQuery)
export class ListUserContactsHandler
  extends BaseQueryHandler<ListUserContactsQuery, readonly UserContactResponseDTO[]>
  implements IQueryHandler<ListUserContactsQuery> {
  readonly queryType = 'ListUserContactsQuery';
  constructor(
    @Inject(USER_CONTACT_REPO) private readonly repo: UserContactRepository,
  ) { super(); }

  async execute(
    query: ListUserContactsQuery,
  ): Promise<readonly UserContactResponseDTO[]> {
    const rows = await this.repo.findByUserId(query.userId);
    return rows.map((c) => ({
      id: c.id,
      userId: c.userId,
      email: c.email?.value,
      phone: c.phone?.value,
      verified: c.verified,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }
}
