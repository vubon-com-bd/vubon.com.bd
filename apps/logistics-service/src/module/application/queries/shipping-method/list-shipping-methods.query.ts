import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ShippingMethodListOptionsDTO } from '@application/services/interfaces/shipping-method.service.interface';
export class ListShippingMethodsQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.list';
  constructor(public readonly options: ShippingMethodListOptionsDTO) { super(); }
}
