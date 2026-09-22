import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDefaultAddressQuery } from './get-default-address.query';

@QueryHandler(GetDefaultAddressQuery)
export class GetDefaultAddressHandler
  extends BaseQueryHandler<GetDefaultAddressQuery, unknown>
  implements IQueryHandler<GetDefaultAddressQuery>
{
  readonly queryType = 'user.address.get-default';

  async execute(query: GetDefaultAddressQuery): Promise<unknown> {
    void query;
    return null;
  }
}
