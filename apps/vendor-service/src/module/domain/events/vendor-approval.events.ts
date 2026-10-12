/**
 * Vendor Approval domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorApproval';

export const VENDOR_APPROVAL_EVENT_TYPE = {
  SUBMITTED: 'vendor.approval.submitted',
  APPROVED: 'vendor.approval.approved',
  REJECTED: 'vendor.approval.rejected',
  INFO_REQUESTED: 'vendor.approval.info_requested',
  RESUBMITTED: 'vendor.approval.resubmitted',
  APPEAL_FILED: 'vendor.approval.appeal_filed',
} as const;

export interface VendorApprovalSubmittedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly submittedAt: string;
}
export interface VendorApprovalApprovedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly note?: string;
  readonly approvedAt: string;
}
export interface VendorApprovalRejectedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly reason: string;
  readonly note?: string;
  readonly rejectedAt: string;
  readonly appealDeadline: string;
}
export interface VendorApprovalInfoRequestedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly note: string;
  readonly requestedAt: string;
}
export interface VendorApprovalResubmittedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly resubmissionCount: number;
  readonly resubmittedAt: string;
}
export interface VendorApprovalAppealFiledPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly filedAt: string;
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

export class VendorApprovalSubmittedEvent extends BaseDomainEvent<typeof VENDOR_APPROVAL_EVENT_TYPE.SUBMITTED, VendorApprovalSubmittedPayload> {
  constructor(p: EventParams<VendorApprovalSubmittedPayload>) { super(buildParams(VENDOR_APPROVAL_EVENT_TYPE.SUBMITTED, p)); }
}
export class VendorApprovalApprovedEvent extends BaseDomainEvent<typeof VENDOR_APPROVAL_EVENT_TYPE.APPROVED, VendorApprovalApprovedPayload> {
  constructor(p: EventParams<VendorApprovalApprovedPayload>) { super(buildParams(VENDOR_APPROVAL_EVENT_TYPE.APPROVED, p)); }
}
export class VendorApprovalRejectedEvent extends BaseDomainEvent<typeof VENDOR_APPROVAL_EVENT_TYPE.REJECTED, VendorApprovalRejectedPayload> {
  constructor(p: EventParams<VendorApprovalRejectedPayload>) { super(buildParams(VENDOR_APPROVAL_EVENT_TYPE.REJECTED, p)); }
}
export class VendorApprovalInfoRequestedEvent extends BaseDomainEvent<typeof VENDOR_APPROVAL_EVENT_TYPE.INFO_REQUESTED, VendorApprovalInfoRequestedPayload> {
  constructor(p: EventParams<VendorApprovalInfoRequestedPayload>) { super(buildParams(VENDOR_APPROVAL_EVENT_TYPE.INFO_REQUESTED, p)); }
}
export class VendorApprovalResubmittedEvent extends BaseDomainEvent<typeof VENDOR_APPROVAL_EVENT_TYPE.RESUBMITTED, VendorApprovalResubmittedPayload> {
  constructor(p: EventParams<VendorApprovalResubmittedPayload>) { super(buildParams(VENDOR_APPROVAL_EVENT_TYPE.RESUBMITTED, p)); }
}
export class VendorApprovalAppealFiledEvent extends BaseDomainEvent<typeof VENDOR_APPROVAL_EVENT_TYPE.APPEAL_FILED, VendorApprovalAppealFiledPayload> {
  constructor(p: EventParams<VendorApprovalAppealFiledPayload>) { super(buildParams(VENDOR_APPROVAL_EVENT_TYPE.APPEAL_FILED, p)); }
}
