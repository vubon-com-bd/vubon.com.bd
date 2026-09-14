/**
 * Support SLA Types
 * @module shared-types/support
 */

import type {
  SUPPORT_SLA_STATUS,
  SUPPORT_SLA_METRIC,
  SUPPORT_SLA_TARGET,
} from '@vubon/shared-constants/support';
import type { TicketPriorityValue } from './ticket-priority.types';

export type SupportSlaStatusValue = (typeof SUPPORT_SLA_STATUS)[keyof typeof SUPPORT_SLA_STATUS];

export type SupportSlaMetricValue = (typeof SUPPORT_SLA_METRIC)[keyof typeof SUPPORT_SLA_METRIC];

export type SupportSlaTarget = typeof SUPPORT_SLA_TARGET;

export interface SupportSla {
  readonly ticketId: string;
  readonly metric: SupportSlaMetricValue;
  readonly targetMinutes: number;
  readonly actualMinutes?: number;
  readonly status: SupportSlaStatusValue;
  readonly dueAt: string;
  readonly metAt?: string;
  readonly breachedAt?: string;
  readonly remainingMinutes?: number;
  readonly warningThresholdPercent?: number;
}

export interface SupportSlaPolicy {
  readonly priority: TicketPriorityValue;
  readonly firstResponseMinutes: number;
  readonly resolutionMinutes: number;
  readonly businessHoursOnly: boolean;
  readonly timezone: string;
  readonly isActive: boolean;
}

export interface SupportSlaBreach {
  readonly ticketId: string;
  readonly metric: SupportSlaMetricValue;
  readonly targetMinutes: number;
  readonly actualMinutes: number;
  readonly breachMinutes: number;
  readonly breachedAt: string;
}
