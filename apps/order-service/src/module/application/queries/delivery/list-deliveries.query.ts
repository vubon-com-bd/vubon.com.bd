/**
 * ListDeliveriesQuery
 * @module order-service/application/queries/delivery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DeliveryListOptionsDTO } from '../../services/interfaces/delivery.service.interface.js';

export class ListDeliveriesQuery extends BaseQuery {
  readonly type = 'order.delivery.list';
  constructor(public readonly options: DeliveryListOptionsDTO) {
    super();
  }
}
