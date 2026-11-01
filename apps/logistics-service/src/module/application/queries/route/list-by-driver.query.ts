import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByDriverRouteQuery extends BaseQuery {
  readonly type = 'logistics.route.list_by_driver';
  constructor(public readonly driverId: string) { super(); }
}
