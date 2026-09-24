import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAgentsQuery extends BaseQuery {
  readonly type = 'support.agent.list';

  constructor() {
    super();
  }
}
