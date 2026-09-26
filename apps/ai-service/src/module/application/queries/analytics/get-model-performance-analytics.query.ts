import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetModelPerformanceAnalyticsQuery extends BaseQuery {
  readonly type = 'ai.analytics.model-performance';
  constructor(public readonly modelId: string, public readonly fromDate?: string, public readonly toDate?: string) { super(); }
}
