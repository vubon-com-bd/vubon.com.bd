/**
 * RuleResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportRuleTypeValue,
  SupportRuleStatusValue,
  SupportRuleConditionValue,
  SupportRuleActionValue,
} from '@vubon/shared-types/support';

export interface RuleConditionResponseDTO {
  readonly field: string;
  readonly operator: SupportRuleConditionValue;
  readonly value: unknown;
}

export interface RuleActionResponseDTO {
  readonly action: SupportRuleActionValue;
  readonly params?: Readonly<Record<string, unknown>>;
}

export interface RuleResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: SupportRuleTypeValue;
  readonly status: SupportRuleStatusValue;
  readonly priority: number;
  readonly conditions: readonly RuleConditionResponseDTO[];
  readonly actions: readonly RuleActionResponseDTO[];
  readonly stopOnMatch: boolean;
  readonly isActive: boolean;
  readonly triggerCount: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
