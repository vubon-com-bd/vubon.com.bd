/**
 * Vendor Performance domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorPerformance';

export const VENDOR_PERFORMANCE_EVENT_TYPE = {
  EVALUATED: 'vendor.performance.evaluated',
  GRADE_CHANGED: 'vendor.performance.grade_changed',
  WARNING_ISSUED: 'vendor.performance.warning_issued',
  WARNING_CLEARED: 'vendor.performance.warning_cleared',
  SUSPENDED: 'vendor.performance.suspended',
  REINSTATED: 'vendor.performance.reinstated',
} as const;

export interface VendorPerformanceEvaluatedPayload {
  readonly performanceId: string;
  readonly vendorId: string;
  readonly overallScore: number;
  readonly grade: string;
  readonly orderCount: number;
  readonly evaluatedAt: string;
}
export interface VendorPerformanceGradeChangedPayload {
  readonly performanceId: string;
  readonly vendorId: string;
  readonly fromGrade: string;
  readonly toGrade: string;
  readonly score: number;
  readonly changedAt: string;
}
export interface VendorPerformanceWarningPayload {
  readonly performanceId: string;
  readonly vendorId: string;
  readonly score: number;
  readonly reason?: string;
  readonly issuedAt: string;
}
export interface VendorPerformanceStatusChangedPayload {
  readonly performanceId: string;
  readonly vendorId: string;
  readonly score: number;
  readonly changedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorPerformanceEvaluatedEvent extends BaseDomainEvent<typeof VENDOR_PERFORMANCE_EVENT_TYPE.EVALUATED, VendorPerformanceEvaluatedPayload> {
  constructor(p: EventParams<VendorPerformanceEvaluatedPayload>) { super(buildParams(VENDOR_PERFORMANCE_EVENT_TYPE.EVALUATED, p)); }
}
export class VendorPerformanceGradeChangedEvent extends BaseDomainEvent<typeof VENDOR_PERFORMANCE_EVENT_TYPE.GRADE_CHANGED, VendorPerformanceGradeChangedPayload> {
  constructor(p: EventParams<VendorPerformanceGradeChangedPayload>) { super(buildParams(VENDOR_PERFORMANCE_EVENT_TYPE.GRADE_CHANGED, p)); }
}
export class VendorPerformanceWarningIssuedEvent extends BaseDomainEvent<typeof VENDOR_PERFORMANCE_EVENT_TYPE.WARNING_ISSUED, VendorPerformanceWarningPayload> {
  constructor(p: EventParams<VendorPerformanceWarningPayload>) { super(buildParams(VENDOR_PERFORMANCE_EVENT_TYPE.WARNING_ISSUED, p)); }
}
export class VendorPerformanceWarningClearedEvent extends BaseDomainEvent<typeof VENDOR_PERFORMANCE_EVENT_TYPE.WARNING_CLEARED, VendorPerformanceStatusChangedPayload> {
  constructor(p: EventParams<VendorPerformanceStatusChangedPayload>) { super(buildParams(VENDOR_PERFORMANCE_EVENT_TYPE.WARNING_CLEARED, p)); }
}
export class VendorPerformanceSuspendedEvent extends BaseDomainEvent<typeof VENDOR_PERFORMANCE_EVENT_TYPE.SUSPENDED, VendorPerformanceStatusChangedPayload> {
  constructor(p: EventParams<VendorPerformanceStatusChangedPayload>) { super(buildParams(VENDOR_PERFORMANCE_EVENT_TYPE.SUSPENDED, p)); }
}
export class VendorPerformanceReinstatedEvent extends BaseDomainEvent<typeof VENDOR_PERFORMANCE_EVENT_TYPE.REINSTATED, VendorPerformanceStatusChangedPayload> {
  constructor(p: EventParams<VendorPerformanceStatusChangedPayload>) { super(buildParams(VENDOR_PERFORMANCE_EVENT_TYPE.REINSTATED, p)); }
}
