import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTeamsQuery extends BaseQuery {
  readonly type = 'support.team.list';

  constructor() {
    super();
  }
}
