import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListActiveRoutesQuery extends BaseQuery {
  readonly type = 'logistics.route.list_active';
  constructor() { super(); }
}
