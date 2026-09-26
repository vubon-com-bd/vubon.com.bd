/**
 * Support Automation Types
 * @module shared-types/support
 */

import type {
  SUPPORT_AUTOMATION_TYPE,
  SUPPORT_AUTOMATION_TRIGGER,
  SUPPORT_AUTOMATION_STATUS,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';

export type SupportAutomationTypeValue =
  (typeof SUPPORT_AUTOMATION_TYPE)[keyof typeof SUPPORT_AUTOMATION_TYPE];

export type SupportAutomationTriggerValue =
  (typeof SUPPORT_AUTOMATION_TRIGGER)[keyof typeof SUPPORT_AUTOMATION_TRIGGER];

export type SupportAutomationStatusValue =
  (typeof SUPPORT_AUTOMATION_STATUS)[keyof typeof SUPPORT_AUTOMATION_STATUS];

export interface SupportAutomation extends BaseEntity<string> {
  readonly name: string;
  readonly description?: string;
  readonly type: SupportAutomationTypeValue;
  readonly status: SupportAutomationStatusValue;
  readonly trigger: SupportAutomationTrigger;
  readonly steps: readonly SupportAutomationStep[];
  readonly isActive: boolean;
  readonly executionCount: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly createdBy: string;
}

export interface SupportAutomationTrigger {
  readonly type: SupportAutomationTriggerValue;
  readonly conditions?: Readonly<Record<string, unknown>>;
}

export interface SupportAutomationStep {
  readonly id: string;
  readonly order: number;
  readonly action: string;
  readonly params: Readonly<Record<string, unknown>>;
  readonly delayMinutes?: number;
}

export interface SupportAutomationExecution {
  readonly id: string;
  readonly automationId: string;
  readonly ticketId?: string;
  readonly status: 'success' | 'failed' | 'partial';
  readonly stepsExecuted: number;
  readonly error?: string;
  readonly startedAt: string;
  readonly completedAt?: string;
}
