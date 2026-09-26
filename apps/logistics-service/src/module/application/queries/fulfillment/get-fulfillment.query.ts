import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.get';

  constructor(public readonly fulfillmentId: string) {
    super();
  }
}
