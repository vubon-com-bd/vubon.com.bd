import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPendingReturnsQuery extends BaseQuery {
  readonly type = 'logistics.return-shipment.list-pending';

  constructor() {
    super();
  }
}
