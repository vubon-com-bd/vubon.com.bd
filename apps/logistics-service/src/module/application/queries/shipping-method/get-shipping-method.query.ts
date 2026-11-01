import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShippingMethodQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.get';
  constructor(public readonly methodId: string) { super(); }
}
