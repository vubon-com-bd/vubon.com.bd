/**
 * GetRuleQuery
 * @module support-service/application/queries/rule
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRuleQuery extends BaseQuery {
  readonly type = 'support.rule.get';

  constructor(public readonly ruleId: string) {
    super();
  }
}
