import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReturnQuery } from './get-return.query';

@QueryHandler(GetReturnQuery)
export class GetReturnHandler
  extends BaseQueryHandler<GetReturnQuery, unknown>
  implements IQueryHandler<GetReturnQuery>
{
  readonly queryType = 'order.return.get';

  async execute(query: GetReturnQuery): Promise<unknown> {
    void query;
    return null;
  }
}
