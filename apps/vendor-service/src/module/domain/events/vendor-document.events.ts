/**
 * Vendor Document domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorDocument';

export const VENDOR_DOCUMENT_EVENT_TYPE = {
  UPLOADED: 'vendor.document.uploaded',
  VERIFIED: 'vendor.document.verified',
  REJECTED: 'vendor.document.rejected',
  RESUBMITTED: 'vendor.document.resubmitted',
  EXPIRED: 'vendor.document.expired',
  DELETED: 'vendor.document.deleted',
} as const;

export interface VendorDocumentUploadedPayload {
  readonly documentId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly fileName: string;
  readonly mimeType: string;
  readonly fileSize: number;
  readonly uploadedAt: string;
}
export interface VendorDocumentVerifiedPayload {
  readonly documentId: string;
  readonly vendorId: string;
  readonly verifiedBy: string;
  readonly verifiedAt: string;
}
export interface VendorDocumentRejectedPayload {
  readonly documentId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly rejectedAt: string;
}
export interface VendorDocumentResubmittedPayload {
  readonly documentId: string;
  readonly vendorId: string;
  readonly fileUrl: string;
  readonly resubmittedAt: string;
}
export interface VendorDocumentExpiredPayload {
  readonly documentId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
}
export interface VendorDocumentDeletedPayload {
  readonly documentId: string;
  readonly vendorId: string;
  readonly deletedBy?: string;
  readonly deletedAt: string;
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

export class VendorDocumentUploadedEvent extends BaseDomainEvent<typeof VENDOR_DOCUMENT_EVENT_TYPE.UPLOADED, VendorDocumentUploadedPayload> {
  constructor(p: EventParams<VendorDocumentUploadedPayload>) { super(buildParams(VENDOR_DOCUMENT_EVENT_TYPE.UPLOADED, p)); }
}
export class VendorDocumentVerifiedEvent extends BaseDomainEvent<typeof VENDOR_DOCUMENT_EVENT_TYPE.VERIFIED, VendorDocumentVerifiedPayload> {
  constructor(p: EventParams<VendorDocumentVerifiedPayload>) { super(buildParams(VENDOR_DOCUMENT_EVENT_TYPE.VERIFIED, p)); }
}
export class VendorDocumentRejectedEvent extends BaseDomainEvent<typeof VENDOR_DOCUMENT_EVENT_TYPE.REJECTED, VendorDocumentRejectedPayload> {
  constructor(p: EventParams<VendorDocumentRejectedPayload>) { super(buildParams(VENDOR_DOCUMENT_EVENT_TYPE.REJECTED, p)); }
}
export class VendorDocumentResubmittedEvent extends BaseDomainEvent<typeof VENDOR_DOCUMENT_EVENT_TYPE.RESUBMITTED, VendorDocumentResubmittedPayload> {
  constructor(p: EventParams<VendorDocumentResubmittedPayload>) { super(buildParams(VENDOR_DOCUMENT_EVENT_TYPE.RESUBMITTED, p)); }
}
export class VendorDocumentExpiredEvent extends BaseDomainEvent<typeof VENDOR_DOCUMENT_EVENT_TYPE.EXPIRED, VendorDocumentExpiredPayload> {
  constructor(p: EventParams<VendorDocumentExpiredPayload>) { super(buildParams(VENDOR_DOCUMENT_EVENT_TYPE.EXPIRED, p)); }
}
export class VendorDocumentDeletedEvent extends BaseDomainEvent<typeof VENDOR_DOCUMENT_EVENT_TYPE.DELETED, VendorDocumentDeletedPayload> {
  constructor(p: EventParams<VendorDocumentDeletedPayload>) { super(buildParams(VENDOR_DOCUMENT_EVENT_TYPE.DELETED, p)); }
}
