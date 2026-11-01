import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByDriverDispatchQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list_by_driver';
  constructor(public readonly driverId: string) { super(); }
}
