import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListOperationalCouriersQuery extends BaseQuery {
  readonly type = 'logistics.courier.list_operational';
  constructor() { super(); }
}
