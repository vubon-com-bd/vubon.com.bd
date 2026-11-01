import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDefaultShippingMethodQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.get_default';
  constructor() { super(); }
}
