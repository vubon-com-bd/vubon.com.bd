import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCouponsQuery } from './list-coupons.query';

@QueryHandler(ListCouponsQuery)
export class ListCouponsHandler
  extends BaseQueryHandler<ListCouponsQuery, readonly unknown[]>
  implements IQueryHandler<ListCouponsQuery>
{
  readonly queryType = 'coupon.list';

  async execute(_query: ListCouponsQuery): Promise<readonly unknown[]> {
    return [];
  }
}
