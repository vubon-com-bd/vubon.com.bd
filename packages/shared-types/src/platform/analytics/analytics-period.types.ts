/**
 * Analytics Period Types
 * @module shared-types/platform/analytics
 */

import type { ANALYTICS_PERIOD, ANALYTICS_PERIOD_DAYS } from '@vubon/shared-constants/platform';

export type AnalyticsPeriodValue = (typeof ANALYTICS_PERIOD)[keyof typeof ANALYTICS_PERIOD];

export type AnalyticsPeriodDays =
  (typeof ANALYTICS_PERIOD_DAYS)[keyof typeof ANALYTICS_PERIOD_DAYS];

export interface AnalyticsPeriod {
  readonly period: AnalyticsPeriodValue;
  readonly startAt: string;
  readonly endAt: string;
  readonly days: number;
}

export interface AnalyticsPeriodMetadata {
  readonly value: AnalyticsPeriodValue;
  readonly label: string;
  readonly days?: AnalyticsPeriodDays;
}
