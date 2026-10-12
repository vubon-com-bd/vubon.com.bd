import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListContactsQuery } from './list-contacts.query.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface.js';
import { USER_CONTACT_SERVICE } from '../../services/interfaces/user-contact.service.interface.js';

@QueryHandler(ListContactsQuery)
export class ListContactsHandler
  extends BaseQueryHandler<ListContactsQuery, readonly UserContactResponseDTO[]>
  implements IQueryHandler<ListContactsQuery>
{
  readonly queryType = 'user.list-contacts';
  constructor(@Inject(USER_CONTACT_SERVICE) private readonly service: UserContactServiceInterface) { super(); }
  async execute(q: ListContactsQuery): Promise<readonly UserContactResponseDTO[]> {
    return this.service.listForUser(q.userId);
  }
}
