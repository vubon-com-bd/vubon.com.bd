import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetInsightQuery extends BaseQuery {
  readonly type = 'ai.insight.get';
  constructor(public readonly insightId: string) { super(); }
}
