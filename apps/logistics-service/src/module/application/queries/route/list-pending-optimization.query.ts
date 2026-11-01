import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListPendingOptimizationQuery extends BaseQuery {
  readonly type = 'logistics.route.list_pending_optimization';
  constructor() { super(); }
}
