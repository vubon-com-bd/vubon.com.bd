import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAgentPerformanceQuery extends BaseQuery {
  readonly type = 'support.analytics.agent-performance';

  constructor(public readonly agentId: string) {
    super();
  }
}
