/**
 * Vendor Report domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorReport';

export const VENDOR_REPORT_EVENT_TYPE = {
  REQUESTED: 'vendor.report.requested',
  GENERATION_STARTED: 'vendor.report.generation_started',
  READY: 'vendor.report.ready',
  FAILED: 'vendor.report.failed',
  EXPIRED: 'vendor.report.expired',
  DOWNLOADED: 'vendor.report.downloaded',
} as const;

export interface VendorReportRequestedPayload {
  readonly reportId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly format: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly requestedAt: string;
}
export interface VendorReportGenerationStartedPayload {
  readonly reportId: string;
  readonly vendorId: string;
  readonly startedAt: string;
}
export interface VendorReportReadyPayload {
  readonly reportId: string;
  readonly vendorId: string;
  readonly fileUrl: string;
  readonly fileSize: number;
  readonly expiresAt: string;
  readonly readyAt: string;
}
export interface VendorReportFailedPayload {
  readonly reportId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly failedAt: string;
}
export interface VendorReportExpiredPayload {
  readonly reportId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
}
export interface VendorReportDownloadedPayload {
  readonly reportId: string;
  readonly vendorId: string;
  readonly downloadedBy: string;
  readonly downloadedAt: string;
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

export class VendorReportRequestedEvent extends BaseDomainEvent<typeof VENDOR_REPORT_EVENT_TYPE.REQUESTED, VendorReportRequestedPayload> {
  constructor(p: EventParams<VendorReportRequestedPayload>) { super(buildParams(VENDOR_REPORT_EVENT_TYPE.REQUESTED, p)); }
}
export class VendorReportGenerationStartedEvent extends BaseDomainEvent<typeof VENDOR_REPORT_EVENT_TYPE.GENERATION_STARTED, VendorReportGenerationStartedPayload> {
  constructor(p: EventParams<VendorReportGenerationStartedPayload>) { super(buildParams(VENDOR_REPORT_EVENT_TYPE.GENERATION_STARTED, p)); }
}
export class VendorReportReadyEvent extends BaseDomainEvent<typeof VENDOR_REPORT_EVENT_TYPE.READY, VendorReportReadyPayload> {
  constructor(p: EventParams<VendorReportReadyPayload>) { super(buildParams(VENDOR_REPORT_EVENT_TYPE.READY, p)); }
}
export class VendorReportFailedEvent extends BaseDomainEvent<typeof VENDOR_REPORT_EVENT_TYPE.FAILED, VendorReportFailedPayload> {
  constructor(p: EventParams<VendorReportFailedPayload>) { super(buildParams(VENDOR_REPORT_EVENT_TYPE.FAILED, p)); }
}
export class VendorReportExpiredEvent extends BaseDomainEvent<typeof VENDOR_REPORT_EVENT_TYPE.EXPIRED, VendorReportExpiredPayload> {
  constructor(p: EventParams<VendorReportExpiredPayload>) { super(buildParams(VENDOR_REPORT_EVENT_TYPE.EXPIRED, p)); }
}
export class VendorReportDownloadedEvent extends BaseDomainEvent<typeof VENDOR_REPORT_EVENT_TYPE.DOWNLOADED, VendorReportDownloadedPayload> {
  constructor(p: EventParams<VendorReportDownloadedPayload>) { super(buildParams(VENDOR_REPORT_EVENT_TYPE.DOWNLOADED, p)); }
}
