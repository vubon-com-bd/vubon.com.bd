/**
 * CreateRuleRequestDTO
 * @module support-service/application/dtos/requests/rule
 */
import type {
  SupportRuleTypeValue,
  SupportRuleConditionValue,
  SupportRuleActionValue,
} from '@vubon/shared-types/support';

export interface RuleConditionInput {
  readonly field: string;
  readonly operator: SupportRuleConditionValue;
  readonly value: unknown;
}

export interface RuleActionInput {
  readonly action: SupportRuleActionValue;
  readonly params?: Readonly<Record<string, unknown>>;
}

export interface CreateRuleRequestDTO {
  readonly name: string;
  readonly description?: string;
  readonly type: SupportRuleTypeValue;
  readonly priority: number;
  readonly conditions: readonly RuleConditionInput[];
  readonly actions: readonly RuleActionInput[];
  readonly stopOnMatch?: boolean;
  readonly createdBy: string;
}
