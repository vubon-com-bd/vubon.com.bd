/**
 * Vendor Review Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_REVIEW_EVENT_TYPE = {
  SUBMITTED: 'vendor.review.submitted',
  APPROVED: 'vendor.review.approved',
  REJECTED: 'vendor.review.rejected',
  FLAGGED: 'vendor.review.flagged',
  HIDDEN: 'vendor.review.hidden',
  REPLIED: 'vendor.review.replied',
  HELPFUL_MARKED: 'vendor.review.helpful_marked',
} as const;

export interface VendorReviewSubmittedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly rating: number;
  readonly isVerifiedPurchase: boolean;
  readonly submittedAt: string;
}

export interface VendorReviewApprovedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly approvedAt: string;
  readonly approvedBy: string;
}

export interface VendorReviewRejectedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly rejectedAt: string;
  readonly rejectedBy: string;
  readonly reason: string;
}

export interface VendorReviewFlaggedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly flaggedAt: string;
  readonly flaggedBy: string;
  readonly reason: string;
}

export interface VendorReviewHiddenPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly hiddenAt: string;
  readonly hiddenBy: string;
  readonly reason: string;
}

export interface VendorReviewRepliedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly repliedAt: string;
  readonly repliedBy: string;
  readonly replyLength: number;
}

export interface VendorReviewHelpfulMarkedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly markedAt: string;
  readonly markedBy: string;
  readonly helpfulCount: number;
}

export class VendorReviewSubmittedEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.SUBMITTED,
  VendorReviewSubmittedPayload
> {
  constructor(p: EventParams<VendorReviewSubmittedPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.SUBMITTED,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}

export class VendorReviewApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.APPROVED,
  VendorReviewApprovedPayload
> {
  constructor(p: EventParams<VendorReviewApprovedPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.APPROVED,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}

export class VendorReviewRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.REJECTED,
  VendorReviewRejectedPayload
> {
  constructor(p: EventParams<VendorReviewRejectedPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.REJECTED,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}

export class VendorReviewFlaggedEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.FLAGGED,
  VendorReviewFlaggedPayload
> {
  constructor(p: EventParams<VendorReviewFlaggedPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.FLAGGED,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}

export class VendorReviewHiddenEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.HIDDEN,
  VendorReviewHiddenPayload
> {
  constructor(p: EventParams<VendorReviewHiddenPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.HIDDEN,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}

export class VendorReviewRepliedEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.REPLIED,
  VendorReviewRepliedPayload
> {
  constructor(p: EventParams<VendorReviewRepliedPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.REPLIED,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}

export class VendorReviewHelpfulMarkedEvent extends BaseDomainEvent<
  typeof VENDOR_REVIEW_EVENT_TYPE.HELPFUL_MARKED,
  VendorReviewHelpfulMarkedPayload
> {
  constructor(p: EventParams<VendorReviewHelpfulMarkedPayload>) {
    super(
      buildEventParams(
        VENDOR_REVIEW_EVENT_TYPE.HELPFUL_MARKED,
        VENDOR_AGGREGATE_TYPE.REVIEW,
        p,
      ),
    );
  }
}
