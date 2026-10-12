import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetRouteQuery extends BaseQuery {
  readonly type = 'logistics.route.get';
  constructor(public readonly routeId: string) { super(); }
}
