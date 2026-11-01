import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { FulfillmentListOptionsDTO } from '@application/services/interfaces/fulfillment.service.interface';
export class ListFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.list';
  constructor(public readonly options: FulfillmentListOptionsDTO) { super(); }
}
