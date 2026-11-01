import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByCourierDispatchQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list_by_courier';
  constructor(public readonly courierId: string) { super(); }
}
