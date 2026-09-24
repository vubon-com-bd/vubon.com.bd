import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAvailableAgentsQuery extends BaseQuery {
  readonly type = 'support.agent.list-available';

  constructor() {
    super();
  }
}
