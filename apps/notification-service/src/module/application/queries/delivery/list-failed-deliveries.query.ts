import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListFailedDeliveriesQuery extends BaseQuery {
  readonly type = 'delivery.list-failed';

  constructor(public readonly limit: number = 50) {
    super();
  }
}
