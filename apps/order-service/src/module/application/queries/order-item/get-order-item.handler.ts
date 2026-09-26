import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetOrderItemQuery } from './get-order-item.query';

@QueryHandler(GetOrderItemQuery)
export class GetOrderItemHandler
  extends BaseQueryHandler<GetOrderItemQuery, unknown>
  implements IQueryHandler<GetOrderItemQuery>
{
  readonly queryType = 'order.item.get';

  async execute(query: GetOrderItemQuery): Promise<unknown> {
    void query;
    return null;
  }
}
