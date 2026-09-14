/**
 * Logistics Report Types
 * @module shared-types/logistics
 */

import type { LogisticsAnalyticsPeriodValue } from './logistics-analytics.types';

export type LogisticsReportTypeValue =
  | 'shipments'
  | 'deliveries'
  | 'couriers'
  | 'warehouses'
  | 'drivers'
  | 'vehicles'
  | 'routes'
  | 'performance'
  | 'costs'
  | 'custom';

export type LogisticsReportFormatValue = 'pdf' | 'csv' | 'xlsx' | 'json';

export type LogisticsReportScheduleValue =
  'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'on_demand';

export interface LogisticsReport {
  readonly id: string;
  readonly type: LogisticsReportTypeValue;
  readonly format: LogisticsReportFormatValue;
  readonly schedule?: LogisticsReportScheduleValue;
  readonly period: LogisticsAnalyticsPeriodValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
}

export interface LogisticsReportRequest {
  readonly type: LogisticsReportTypeValue;
  readonly format: LogisticsReportFormatValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly filters?: Readonly<Record<string, unknown>>;
}
