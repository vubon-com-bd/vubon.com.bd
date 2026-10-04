/**
 * Marketing Automation Types
 * @module shared-types/marketing
 */

import type {
  MARKETING_AUTOMATION_TYPE,
  MARKETING_AUTOMATION_TRIGGER,
  MARKETING_AUTOMATION_ACTION,
  MARKETING_AUTOMATION_STATUS,
} from '@vubon/shared-constants/marketing';

export type MarketingAutomationTypeValue =
  (typeof MARKETING_AUTOMATION_TYPE)[keyof typeof MARKETING_AUTOMATION_TYPE];

export type MarketingAutomationTriggerValue =
  (typeof MARKETING_AUTOMATION_TRIGGER)[keyof typeof MARKETING_AUTOMATION_TRIGGER];

export type MarketingAutomationActionValue =
  (typeof MARKETING_AUTOMATION_ACTION)[keyof typeof MARKETING_AUTOMATION_ACTION];

export type MarketingAutomationStatusValue =
  (typeof MARKETING_AUTOMATION_STATUS)[keyof typeof MARKETING_AUTOMATION_STATUS];

export interface MarketingAutomation {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: MarketingAutomationTypeValue;
  readonly status: MarketingAutomationStatusValue;
  readonly trigger: AutomationTrigger;
  readonly steps: readonly AutomationStep[];
  readonly isActive: boolean;
  readonly executionCount: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface AutomationTrigger {
  readonly type: MarketingAutomationTriggerValue;
  readonly conditions?: Readonly<Record<string, unknown>>;
}

export interface AutomationStep {
  readonly id: string;
  readonly order: number;
  readonly action: MarketingAutomationActionValue;
  readonly params: Readonly<Record<string, unknown>>;
  readonly delayMinutes?: number;
  readonly conditions?: Readonly<Record<string, unknown>>;
}

export interface AutomationExecution {
  readonly id: string;
  readonly automationId: string;
  readonly userId?: string;
  readonly status: 'success' | 'failed' | 'partial';
  readonly stepsExecuted: number;
  readonly error?: string;
  readonly startedAt: string;
  readonly completedAt?: string;
}
