import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DeliveryListOptionsDTO } from '@application/services/interfaces/delivery.service.interface';
export class ListDeliveriesQuery extends BaseQuery {
  readonly type = 'logistics.delivery.list';
  constructor(public readonly options: DeliveryListOptionsDTO) { super(); }
}
