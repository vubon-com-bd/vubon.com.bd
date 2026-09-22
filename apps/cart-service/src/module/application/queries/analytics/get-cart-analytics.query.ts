import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCartAnalyticsQuery extends BaseQuery {
  readonly type = 'cart.analytics.get';
  constructor() { super(); }
}
