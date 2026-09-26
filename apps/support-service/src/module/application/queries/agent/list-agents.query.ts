/**
 * ListAgentsQuery
 * @module support-service/application/queries/agent
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAgentsQuery extends BaseQuery {
  readonly type = 'support.agent.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
