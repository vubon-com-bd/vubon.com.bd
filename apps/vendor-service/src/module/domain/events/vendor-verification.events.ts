/**
 * Vendor Verification Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_VERIFICATION_EVENT_TYPE = {
  STARTED: 'vendor.verification.started',
  SUBMITTED: 'vendor.verification.submitted',
  REVIEW_STARTED: 'vendor.verification.review_started',
  APPROVED: 'vendor.verification.approved',
  REJECTED: 'vendor.verification.rejected',
  EXPIRED: 'vendor.verification.expired',
  RESUBMITTED: 'vendor.verification.resubmitted',
} as const;

export interface VendorVerificationStartedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly startedAt: string;
}

export interface VendorVerificationSubmittedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly referenceId?: string;
  readonly submittedAt: string;
  readonly attempt: number;
}

export interface VendorVerificationReviewStartedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly reviewedAt: string;
}

export interface VendorVerificationApprovedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly approvedAt: string;
  readonly approvedBy: string;
  readonly expiresAt?: string;
}

export interface VendorVerificationRejectedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly rejectedAt: string;
  readonly rejectedBy: string;
  readonly reason: string;
}

export interface VendorVerificationExpiredPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly expiredAt: string;
}

export interface VendorVerificationResubmittedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly resubmittedAt: string;
  readonly attempt: number;
}

export class VendorVerificationStartedEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.STARTED,
  VendorVerificationStartedPayload
> {
  constructor(p: EventParams<VendorVerificationStartedPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.STARTED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}

export class VendorVerificationSubmittedEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.SUBMITTED,
  VendorVerificationSubmittedPayload
> {
  constructor(p: EventParams<VendorVerificationSubmittedPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.SUBMITTED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}

export class VendorVerificationReviewStartedEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.REVIEW_STARTED,
  VendorVerificationReviewStartedPayload
> {
  constructor(p: EventParams<VendorVerificationReviewStartedPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.REVIEW_STARTED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}

export class VendorVerificationApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.APPROVED,
  VendorVerificationApprovedPayload
> {
  constructor(p: EventParams<VendorVerificationApprovedPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.APPROVED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}

export class VendorVerificationRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.REJECTED,
  VendorVerificationRejectedPayload
> {
  constructor(p: EventParams<VendorVerificationRejectedPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.REJECTED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}

export class VendorVerificationExpiredEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.EXPIRED,
  VendorVerificationExpiredPayload
> {
  constructor(p: EventParams<VendorVerificationExpiredPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.EXPIRED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}

export class VendorVerificationResubmittedEvent extends BaseDomainEvent<
  typeof VENDOR_VERIFICATION_EVENT_TYPE.RESUBMITTED,
  VendorVerificationResubmittedPayload
> {
  constructor(p: EventParams<VendorVerificationResubmittedPayload>) {
    super(
      buildEventParams(
        VENDOR_VERIFICATION_EVENT_TYPE.RESUBMITTED,
        VENDOR_AGGREGATE_TYPE.VERIFICATION,
        p,
      ),
    );
  }
}
