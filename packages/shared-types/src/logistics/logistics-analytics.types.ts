/**
 * Logistics Analytics Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/logistics-analytics.constants থেকে।
 */

import type {
  LOGISTICS_ANALYTICS_METRIC,
  LOGISTICS_ANALYTICS_PERIOD,
} from '@vubon/shared-constants/logistics';
import type { ShipmentStatusValue, ShipmentPriorityValue } from './shipment-status.types';

export type LogisticsAnalyticsMetricValue =
  (typeof LOGISTICS_ANALYTICS_METRIC)[keyof typeof LOGISTICS_ANALYTICS_METRIC];

export type LogisticsAnalyticsPeriodValue =
  (typeof LOGISTICS_ANALYTICS_PERIOD)[keyof typeof LOGISTICS_ANALYTICS_PERIOD];

export interface LogisticsAnalytics {
  readonly metric: LogisticsAnalyticsMetricValue;
  readonly period: LogisticsAnalyticsPeriodValue;
  readonly value: number;
  readonly previousValue?: number;
  readonly changePercent?: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly capturedAt: string;
}

export interface LogisticsMetrics {
  readonly period: string;
  readonly shipmentsCreated: number;
  readonly shipmentsDelivered: number;
  readonly shipmentsInTransit: number;
  readonly shipmentsFailed: number;
  readonly onTimeDeliveryRate: number;
  readonly averageDeliveryMinutes: number;
  readonly averageTransitMinutes: number;
  readonly firstAttemptSuccessRate: number;
  readonly returnRate: number;
  readonly damageRate: number;
  readonly lossRate: number;
  readonly costPerShipment: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<ShipmentStatusValue, number>>;
  readonly byPriority: Readonly<Record<ShipmentPriorityValue, number>>;
}
