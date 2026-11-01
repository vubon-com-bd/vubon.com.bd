import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShippingMethodStatsQuery extends BaseQuery {
  readonly type = 'logistics.shipping_method.stats';
  constructor() { super(); }
}
