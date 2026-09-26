import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListFulfillmentsQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.list';

  constructor(
    public readonly orderId?: string,
    public readonly status?: string,
  ) {
    super();
  }
}
