import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTrackingQuery } from './get-tracking.query';

@QueryHandler(GetTrackingQuery)
export class GetTrackingHandler
  extends BaseQueryHandler<GetTrackingQuery, unknown>
  implements IQueryHandler<GetTrackingQuery>
{
  readonly queryType = 'tracking.get';

  async execute(query: GetTrackingQuery): Promise<unknown> {
    void query;
    return null;
  }
}
