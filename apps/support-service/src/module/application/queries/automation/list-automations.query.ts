/**
 * ListAutomationsQuery
 * @module support-service/application/queries/automation
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAutomationsQuery extends BaseQuery {
  readonly type = 'support.automation.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
