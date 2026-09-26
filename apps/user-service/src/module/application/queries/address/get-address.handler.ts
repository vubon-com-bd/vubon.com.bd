import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAddressQuery } from './get-address.query';

@QueryHandler(GetAddressQuery)
export class GetAddressHandler
  extends BaseQueryHandler<GetAddressQuery, unknown>
  implements IQueryHandler<GetAddressQuery>
{
  readonly queryType = 'user.address.get';

  async execute(query: GetAddressQuery): Promise<unknown> {
    void query;
    return null;
  }
}
