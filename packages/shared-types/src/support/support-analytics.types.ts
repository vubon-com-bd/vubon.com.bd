/**
 * Support Analytics Types
 * @module shared-types/support
 */

import type {
  SUPPORT_ANALYTICS_METRIC,
  SUPPORT_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/support';
import type { TicketPriorityValue } from './ticket-priority.types';
import type { TicketStatusValue } from './ticket-status.types';

export type SupportAnalyticsMetricValue =
  (typeof SUPPORT_ANALYTICS_METRIC)[keyof typeof SUPPORT_ANALYTICS_METRIC];

export type SupportAnalyticsPeriodValue =
  (typeof SUPPORT_ANALYTICS_PERIOD)[keyof typeof SUPPORT_ANALYTICS_PERIOD];

export interface SupportAnalytics {
  readonly metric: SupportAnalyticsMetricValue;
  readonly period: SupportAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface SupportMetrics {
  readonly period: string;
  readonly ticketsCreated: number;
  readonly ticketsResolved: number;
  readonly ticketsOpen: number;
  readonly ticketsEscalated: number;
  readonly averageFirstResponseMinutes: number;
  readonly averageResolutionMinutes: number;
  readonly firstContactResolutionRate: number;
  readonly csatScore: number;
  readonly npsScore: number;
  readonly slaComplianceRate: number;
  readonly reopenRate: number;
  readonly byStatus: Readonly<Record<TicketStatusValue, number>>;
  readonly byPriority: Readonly<Record<TicketPriorityValue, number>>;
}
