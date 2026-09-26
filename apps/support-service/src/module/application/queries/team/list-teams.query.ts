/**
 * ListTeamsQuery
 * @module support-service/application/queries/team
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTeamsQuery extends BaseQuery {
  readonly type = 'support.team.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
