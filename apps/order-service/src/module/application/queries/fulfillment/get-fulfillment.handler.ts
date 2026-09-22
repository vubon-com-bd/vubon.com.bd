import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFulfillmentQuery } from './get-fulfillment.query';

@QueryHandler(GetFulfillmentQuery)
export class GetFulfillmentHandler
  extends BaseQueryHandler<GetFulfillmentQuery, unknown>
  implements IQueryHandler<GetFulfillmentQuery>
{
  readonly queryType = 'fulfillment.get';

  async execute(query: GetFulfillmentQuery): Promise<unknown> {
    void query;
    return null;
  }
}
