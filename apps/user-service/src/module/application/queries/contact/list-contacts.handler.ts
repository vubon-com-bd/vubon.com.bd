import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListContactsQuery } from './list-contacts.query';
import type { UserContactServiceInterface } from '../../services/interfaces/user-contact.service.interface';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto';

@QueryHandler(ListContactsQuery)
export class ListContactsHandler
  extends BaseQueryHandler<ListContactsQuery, readonly ContactResponseDTO[]>
  implements IQueryHandler<ListContactsQuery>
{
  readonly queryType = 'user.contact.list';

  constructor(private readonly contactService: UserContactServiceInterface) {
    super();
  }

  async execute(query: ListContactsQuery): Promise<readonly ContactResponseDTO[]> {
    return this.contactService.listByUser(query.userId);
  }
}
