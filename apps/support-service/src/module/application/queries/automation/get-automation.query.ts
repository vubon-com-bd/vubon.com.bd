/**
 * GetAutomationQuery
 * @module support-service/application/queries/automation
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAutomationQuery extends BaseQuery {
  readonly type = 'support.automation.get';

  constructor(public readonly automationId: string) {
    super();
  }
}
