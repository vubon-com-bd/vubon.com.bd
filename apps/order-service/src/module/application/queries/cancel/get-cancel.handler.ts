import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCancelQuery } from './get-cancel.query';

@QueryHandler(GetCancelQuery)
export class GetCancelHandler
  extends BaseQueryHandler<GetCancelQuery, unknown>
  implements IQueryHandler<GetCancelQuery>
{
  readonly queryType = 'order.cancel.get';

  async execute(query: GetCancelQuery): Promise<unknown> {
    void query;
    return null;
  }
}
