import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListUsableShippingMethodsQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.list_usable';
  constructor() { super(); }
}
