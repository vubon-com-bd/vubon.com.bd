/**
 * Vendor Approval Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_APPROVAL_EVENT_TYPE = {
  REQUESTED: 'vendor.approval.requested',
  APPROVED: 'vendor.approval.approved',
  REJECTED: 'vendor.approval.rejected',
  INFO_REQUESTED: 'vendor.approval.info_requested',
  RESUBMITTED: 'vendor.approval.resubmitted',
  APPEALED: 'vendor.approval.appealed',
  APPEAL_RESOLVED: 'vendor.approval.appeal_resolved',
} as const;

export interface VendorApprovalRequestedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly requestedAt: string;
  readonly requestedBy?: string;
}

export interface VendorApprovalApprovedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly approvedAt: string;
  readonly approvedBy: string;
  readonly score?: number;
  readonly notes?: string;
}

export interface VendorApprovalRejectedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly rejectedAt: string;
  readonly rejectedBy: string;
  readonly reason: string;
  readonly notes?: string;
}

export interface VendorApprovalInfoRequestedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly requestedAt: string;
  readonly requestedBy: string;
  readonly infoNeeded: string;
}

export interface VendorApprovalResubmittedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly resubmittedAt: string;
  readonly attempt: number;
}

export interface VendorApprovalAppealedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly appealedAt: string;
  readonly appealNotes: string;
}

export interface VendorApprovalAppealResolvedPayload {
  readonly approvalId: string;
  readonly vendorId: string;
  readonly resolvedAt: string;
  readonly resolvedBy: string;
  readonly outcome: 'approved' | 'rejected';
  readonly notes?: string;
}

export class VendorApprovalRequestedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.REQUESTED,
  VendorApprovalRequestedPayload
> {
  constructor(p: EventParams<VendorApprovalRequestedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.REQUESTED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}

export class VendorApprovalApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.APPROVED,
  VendorApprovalApprovedPayload
> {
  constructor(p: EventParams<VendorApprovalApprovedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.APPROVED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}

export class VendorApprovalRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.REJECTED,
  VendorApprovalRejectedPayload
> {
  constructor(p: EventParams<VendorApprovalRejectedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.REJECTED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}

export class VendorApprovalInfoRequestedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.INFO_REQUESTED,
  VendorApprovalInfoRequestedPayload
> {
  constructor(p: EventParams<VendorApprovalInfoRequestedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.INFO_REQUESTED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}

export class VendorApprovalResubmittedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.RESUBMITTED,
  VendorApprovalResubmittedPayload
> {
  constructor(p: EventParams<VendorApprovalResubmittedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.RESUBMITTED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}

export class VendorApprovalAppealedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.APPEALED,
  VendorApprovalAppealedPayload
> {
  constructor(p: EventParams<VendorApprovalAppealedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.APPEALED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}

export class VendorApprovalAppealResolvedEvent extends BaseDomainEvent<
  typeof VENDOR_APPROVAL_EVENT_TYPE.APPEAL_RESOLVED,
  VendorApprovalAppealResolvedPayload
> {
  constructor(p: EventParams<VendorApprovalAppealResolvedPayload>) {
    super(
      buildEventParams(
        VENDOR_APPROVAL_EVENT_TYPE.APPEAL_RESOLVED,
        VENDOR_AGGREGATE_TYPE.APPROVAL,
        p,
      ),
    );
  }
}
