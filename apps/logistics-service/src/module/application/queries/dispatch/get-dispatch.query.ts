import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDispatchQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.get';
  constructor(public readonly dispatchId: string) { super(); }
}
