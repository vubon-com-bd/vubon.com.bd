import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAbandonmentRateQuery extends BaseQuery {
  readonly type = 'cart.analytics.abandonment-rate';
  constructor() { super(); }
}
