import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListPendingDispatchQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list_pending';
  constructor() { super(); }
}
