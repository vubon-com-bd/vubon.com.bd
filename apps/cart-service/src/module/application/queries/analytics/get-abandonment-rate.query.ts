import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetAbandonmentRateQuery extends BaseQuery {
  readonly type = 'analytics.abandonment-rate';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
