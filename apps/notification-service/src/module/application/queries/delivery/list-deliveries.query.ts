import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DeliveryListOptionsDTO } from '../../services/interfaces/delivery.service.interface.js';

export class ListDeliveriesQuery extends BaseQuery {
  readonly type = 'delivery.list';
  constructor(public readonly options: DeliveryListOptionsDTO) { super(); }
}
