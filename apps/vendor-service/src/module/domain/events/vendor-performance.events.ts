/**
 * Vendor Performance Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_PERFORMANCE_EVENT_TYPE = {
  EVALUATED: 'vendor.performance.evaluated',
  GRADE_CHANGED: 'vendor.performance.grade_changed',
  WARNING_ISSUED: 'vendor.performance.warning_issued',
  AUTO_SUSPEND_TRIGGERED: 'vendor.performance.auto_suspend_triggered',
  IMPROVED: 'vendor.performance.improved',
  DECLINED: 'vendor.performance.declined',
} as const;

export interface VendorPerformanceEvaluatedPayload {
  readonly performanceId: string;
  readonly vendorId: string;
  readonly overallScore: number;
  readonly grade: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly evaluatedAt: string;
  readonly totalOrders: number;
}

export interface VendorPerformanceGradeChangedPayload {
  readonly vendorId: string;
  readonly fromGrade: string;
  readonly toGrade: string;
  readonly changedAt: string;
  readonly reason: string;
  readonly overallScore: number;
}

export interface VendorPerformanceWarningIssuedPayload {
  readonly vendorId: string;
  readonly issuedAt: string;
  readonly metric: string;
  readonly currentValue: number;
  readonly threshold: number;
  readonly message: string;
}

export interface VendorPerformanceAutoSuspendTriggeredPayload {
  readonly vendorId: string;
  readonly triggeredAt: string;
  readonly overallScore: number;
  readonly grade: string;
  readonly reason: string;
}

export interface VendorPerformanceImprovedPayload {
  readonly vendorId: string;
  readonly previousScore: number;
  readonly newScore: number;
  readonly delta: number;
  readonly improvedAt: string;
}

export interface VendorPerformanceDeclinedPayload {
  readonly vendorId: string;
  readonly previousScore: number;
  readonly newScore: number;
  readonly delta: number;
  readonly declinedAt: string;
}

export class VendorPerformanceEvaluatedEvent extends BaseDomainEvent<
  typeof VENDOR_PERFORMANCE_EVENT_TYPE.EVALUATED,
  VendorPerformanceEvaluatedPayload
> {
  constructor(p: EventParams<VendorPerformanceEvaluatedPayload>) {
    super(
      buildEventParams(
        VENDOR_PERFORMANCE_EVENT_TYPE.EVALUATED,
        VENDOR_AGGREGATE_TYPE.PERFORMANCE,
        p,
      ),
    );
  }
}

export class VendorPerformanceGradeChangedEvent extends BaseDomainEvent<
  typeof VENDOR_PERFORMANCE_EVENT_TYPE.GRADE_CHANGED,
  VendorPerformanceGradeChangedPayload
> {
  constructor(p: EventParams<VendorPerformanceGradeChangedPayload>) {
    super(
      buildEventParams(
        VENDOR_PERFORMANCE_EVENT_TYPE.GRADE_CHANGED,
        VENDOR_AGGREGATE_TYPE.PERFORMANCE,
        p,
      ),
    );
  }
}

export class VendorPerformanceWarningIssuedEvent extends BaseDomainEvent<
  typeof VENDOR_PERFORMANCE_EVENT_TYPE.WARNING_ISSUED,
  VendorPerformanceWarningIssuedPayload
> {
  constructor(p: EventParams<VendorPerformanceWarningIssuedPayload>) {
    super(
      buildEventParams(
        VENDOR_PERFORMANCE_EVENT_TYPE.WARNING_ISSUED,
        VENDOR_AGGREGATE_TYPE.PERFORMANCE,
        p,
      ),
    );
  }
}

export class VendorPerformanceAutoSuspendTriggeredEvent extends BaseDomainEvent<
  typeof VENDOR_PERFORMANCE_EVENT_TYPE.AUTO_SUSPEND_TRIGGERED,
  VendorPerformanceAutoSuspendTriggeredPayload
> {
  constructor(p: EventParams<VendorPerformanceAutoSuspendTriggeredPayload>) {
    super(
      buildEventParams(
        VENDOR_PERFORMANCE_EVENT_TYPE.AUTO_SUSPEND_TRIGGERED,
        VENDOR_AGGREGATE_TYPE.PERFORMANCE,
        p,
      ),
    );
  }
}

export class VendorPerformanceImprovedEvent extends BaseDomainEvent<
  typeof VENDOR_PERFORMANCE_EVENT_TYPE.IMPROVED,
  VendorPerformanceImprovedPayload
> {
  constructor(p: EventParams<VendorPerformanceImprovedPayload>) {
    super(
      buildEventParams(
        VENDOR_PERFORMANCE_EVENT_TYPE.IMPROVED,
        VENDOR_AGGREGATE_TYPE.PERFORMANCE,
        p,
      ),
    );
  }
}

export class VendorPerformanceDeclinedEvent extends BaseDomainEvent<
  typeof VENDOR_PERFORMANCE_EVENT_TYPE.DECLINED,
  VendorPerformanceDeclinedPayload
> {
  constructor(p: EventParams<VendorPerformanceDeclinedPayload>) {
    super(
      buildEventParams(
        VENDOR_PERFORMANCE_EVENT_TYPE.DECLINED,
        VENDOR_AGGREGATE_TYPE.PERFORMANCE,
        p,
      ),
    );
  }
}
