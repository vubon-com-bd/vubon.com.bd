import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAiUsageQuery extends BaseQuery {
  readonly type = 'ai.analytics.usage';
  constructor(public readonly fromDate?: string, public readonly toDate?: string, public readonly groupBy: string = 'day') { super(); }
}
