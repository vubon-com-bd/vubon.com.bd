import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShippingMethodByCodeQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.by_code';
  constructor(public readonly code: string) { super(); }
}
