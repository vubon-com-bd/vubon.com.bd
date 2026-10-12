import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { FulfillmentListOptionsDTO } from '../../services/interfaces/fulfillment.service.interface.js';
export class ListFulfillmentsQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.list';
  constructor(public readonly options: FulfillmentListOptionsDTO) { super(); }
}
