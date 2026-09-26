import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetActiveCheckoutQuery } from './get-active-checkout.query';

@QueryHandler(GetActiveCheckoutQuery)
export class GetActiveCheckoutHandler
  extends BaseQueryHandler<GetActiveCheckoutQuery, unknown>
  implements IQueryHandler<GetActiveCheckoutQuery>
{
  readonly queryType = 'checkout.get-active';

  async execute(query: GetActiveCheckoutQuery): Promise<unknown> {
    void query;
    return null;
  }
}
