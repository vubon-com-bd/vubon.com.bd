import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListShippingMethodsByZoneQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.list_by_zone';
  constructor(public readonly zone: string) { super(); }
}
