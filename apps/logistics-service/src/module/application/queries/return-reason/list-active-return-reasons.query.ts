import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListActiveReturnReasonsQuery extends BaseQuery {
  readonly type = 'logistics.return_reason.list_active';
  constructor() { super(); }
}
