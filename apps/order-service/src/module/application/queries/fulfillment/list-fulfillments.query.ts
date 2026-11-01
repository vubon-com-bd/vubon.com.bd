/**
 * ListFulfillmentsQuery
 * @module order-service/application/queries/fulfillment
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { FulfillmentListOptionsDTO } from '../../services/interfaces/order-fulfillment.service.interface.js';

export class ListFulfillmentsQuery extends BaseQuery {
  readonly type = 'order.fulfillment.list';
  constructor(public readonly options: FulfillmentListOptionsDTO) {
    super();
  }
}
