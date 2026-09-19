/**
 * Support Report Types
 * @module shared-types/support
 *
 * ⚠️ Note: SupportAnalyticsPeriodValue support-analytics.types.ts থেকে import।
 */

import type { SupportAnalyticsPeriodValue } from './support-analytics.types';

export type SupportReportTypeValue =
  | 'tickets'
  | 'agents'
  | 'sla'
  | 'satisfaction'
  | 'channels'
  | 'categories'
  | 'performance'
  | 'custom';

export type SupportReportFormatValue = 'pdf' | 'csv' | 'xlsx' | 'json';

export type SupportReportScheduleValue =
  'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'on_demand';

export interface SupportReport {
  readonly id: string;
  readonly type: SupportReportTypeValue;
  readonly format: SupportReportFormatValue;
  readonly schedule?: SupportReportScheduleValue;
  readonly period: SupportAnalyticsPeriodValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
}

export interface SupportReportRequest {
  readonly type: SupportReportTypeValue;
  readonly format: SupportReportFormatValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly filters?: Readonly<Record<string, unknown>>;
}
