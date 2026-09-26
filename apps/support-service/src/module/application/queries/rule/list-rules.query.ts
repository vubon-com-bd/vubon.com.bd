/**
 * ListRulesQuery
 * @module support-service/application/queries/rule
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListRulesQuery extends BaseQuery {
  readonly type = 'support.rule.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
