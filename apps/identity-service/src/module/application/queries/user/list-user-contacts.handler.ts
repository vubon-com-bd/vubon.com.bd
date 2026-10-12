import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserContactsQuery } from './list-user-contacts.query.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface.js';
import { USER_CONTACT_SERVICE } from '../../services/interfaces/user-contact.service.interface.js';

@QueryHandler(ListUserContactsQuery)
export class ListUserContactsHandler
  extends BaseQueryHandler<ListUserContactsQuery, readonly UserContactResponseDTO[]>
  implements IQueryHandler<ListUserContactsQuery>
{
  readonly queryType = 'user.list-contacts';
  constructor(@Inject(USER_CONTACT_SERVICE) private readonly service: UserContactServiceInterface) { super(); }
  async execute(q: ListUserContactsQuery): Promise<readonly UserContactResponseDTO[]> { return this.service.listForUser(q.userId); }
}
