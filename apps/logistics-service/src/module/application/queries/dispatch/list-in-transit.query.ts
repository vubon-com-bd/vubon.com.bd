import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInTransitDispatchQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list_in_transit';
  constructor() { super(); }
}
