import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDeliveriesQuery extends BaseQuery {
  readonly type = 'logistics.delivery.list';

  constructor(
    public readonly shipmentId: string,
    public readonly status?: string,
  ) {
    super();
  }
}
