import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPendingFulfillmentsQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.list-pending';

  constructor() {
    super();
  }
}
