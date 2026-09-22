import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetContactQuery } from './get-contact.query';

@QueryHandler(GetContactQuery)
export class GetContactHandler
  extends BaseQueryHandler<GetContactQuery, unknown>
  implements IQueryHandler<GetContactQuery>
{
  readonly queryType = 'user.contact.get';

  async execute(query: GetContactQuery): Promise<unknown> {
    void query;
    return null;
  }
}
