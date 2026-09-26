/**
 * UpdateRuleRequestDTO
 * @module support-service/application/dtos/requests/rule
 */
import type { RuleConditionInput, RuleActionInput } from './create-rule.dto';

export interface UpdateRuleRequestDTO {
  readonly ruleId: string;
  readonly name?: string;
  readonly description?: string;
  readonly priority?: number;
  readonly conditions?: readonly RuleConditionInput[];
  readonly actions?: readonly RuleActionInput[];
  readonly stopOnMatch?: boolean;
}
