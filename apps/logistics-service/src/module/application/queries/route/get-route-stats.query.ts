import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetRouteStatsQuery extends BaseQuery {
  readonly type = 'logistics.route.stats';
  constructor() { super(); }
}
