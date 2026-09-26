import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListInsightsQuery extends BaseQuery {
  readonly type = 'ai.insight.list';

  constructor(
    public readonly insightType?: string,
    public readonly priority?: string,
  ) {
    super();
  }
}
