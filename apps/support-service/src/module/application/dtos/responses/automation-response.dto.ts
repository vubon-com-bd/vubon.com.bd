/**
 * AutomationResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportAutomationTypeValue,
  SupportAutomationStatusValue,
  SupportAutomationTriggerValue,
} from '@vubon/shared-types/support';

export interface AutomationStepResponseDTO {
  readonly id: string;
  readonly order: number;
  readonly action: string;
  readonly params: Readonly<Record<string, unknown>>;
  readonly delayMinutes?: number;
}

export interface AutomationResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: SupportAutomationTypeValue;
  readonly status: SupportAutomationStatusValue;
  readonly trigger: {
    readonly type: SupportAutomationTriggerValue;
    readonly conditions?: Readonly<Record<string, unknown>>;
  };
  readonly steps: readonly AutomationStepResponseDTO[];
  readonly isActive: boolean;
  readonly executionCount: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
