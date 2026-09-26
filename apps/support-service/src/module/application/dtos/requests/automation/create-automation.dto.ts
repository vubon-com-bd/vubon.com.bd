/**
 * CreateAutomationRequestDTO
 * @module support-service/application/dtos/requests/automation
 */
import type {
  SupportAutomationTypeValue,
  SupportAutomationTriggerValue,
} from '@vubon/shared-types/support';

export interface AutomationStepInput {
  readonly id: string;
  readonly order: number;
  readonly action: string;
  readonly params: Readonly<Record<string, unknown>>;
  readonly delayMinutes?: number;
}

export interface AutomationTriggerInput {
  readonly type: SupportAutomationTriggerValue;
  readonly conditions?: Readonly<Record<string, unknown>>;
}

export interface CreateAutomationRequestDTO {
  readonly name: string;
  readonly description?: string;
  readonly type: SupportAutomationTypeValue;
  readonly trigger: AutomationTriggerInput;
  readonly steps: readonly AutomationStepInput[];
  readonly createdBy: string;
}
