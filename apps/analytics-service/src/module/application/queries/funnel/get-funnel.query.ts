import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetFunnelQuery extends BaseQuery {
  readonly type = 'analytics.funnel.get';

  constructor(public readonly funnelId: string) {
    super();
  }
}
