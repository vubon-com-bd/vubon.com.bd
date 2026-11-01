import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDispatchByNumberQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.by_number';
  constructor(public readonly dispatchNumber: string) { super(); }
}
