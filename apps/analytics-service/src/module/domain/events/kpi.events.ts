/**
 * KPI Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class KpiThresholdReachedEvent extends BaseDomainEvent<'analytics.kpi.threshold_reached', {
  readonly kpiId: string;
  readonly kpiName: string;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
}> {
  constructor(
    kpiId: string,
    kpiName: string,
    actual: number,
    target: number,
    achievementPercent: number,
    occurredAt: string
  ) {
    super({
      id: `kpi-threshold-${kpiId}-${Date.now()}`,
      type: 'analytics.kpi.threshold_reached',
      aggregateId: kpiId,
      aggregateType: 'Kpi',
      payload: { kpiId, kpiName, actual, target, achievementPercent },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class KpiBreachEvent extends BaseDomainEvent<'analytics.kpi.breached', {
  readonly kpiId: string;
  readonly kpiName: string;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
}> {
  constructor(
    kpiId: string,
    kpiName: string,
    actual: number,
    target: number,
    achievementPercent: number,
    occurredAt: string
  ) {
    super({
      id: `kpi-breach-${kpiId}-${Date.now()}`,
      type: 'analytics.kpi.breached',
      aggregateId: kpiId,
      aggregateType: 'Kpi',
      payload: { kpiId, kpiName, actual, target, achievementPercent },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
