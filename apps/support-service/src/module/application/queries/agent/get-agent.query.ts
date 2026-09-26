/**
 * GetAgentQuery
 * @module support-service/application/queries/agent
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAgentQuery extends BaseQuery {
  readonly type = 'support.agent.get';

  constructor(public readonly agentId: string) {
    super();
  }
}
