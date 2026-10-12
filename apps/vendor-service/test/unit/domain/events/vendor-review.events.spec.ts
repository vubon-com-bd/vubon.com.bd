import {
  VENDOR_REVIEW_EVENT_TYPE,
  VendorReviewSubmittedEvent,
  VendorReviewApprovedEvent,
  VendorReviewRejectedEvent,
  VendorReviewFlaggedEvent,
  VendorReviewHiddenEvent,
  VendorReviewRestoredEvent,
} from '../../../../src/module/domain/events/vendor-review.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor review events', () => {
  it('constants defined', () => {
    expect(VENDOR_REVIEW_EVENT_TYPE.SUBMITTED).toBe('vendor.review.submitted');
    expect(VENDOR_REVIEW_EVENT_TYPE.APPROVED).toBe('vendor.review.approved');
  });

  it('VendorReviewSubmittedEvent', () => {
    const e = new VendorReviewSubmittedEvent({
      aggregateId: UUID,
      payload: {
        reviewId: UUID, vendorId: UUID, userId: UUID, orderId: UUID,
        rating: 5, isVerifiedPurchase: true, submittedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.review.submitted');
    expect(e.aggregateType).toBe('VendorReview');
  });

  it('VendorReviewApprovedEvent', () => {
    const e = new VendorReviewApprovedEvent({
      aggregateId: UUID,
      payload: { reviewId: UUID, vendorId: UUID, approvedAt: NOW },
    });
    expect(e.type).toBe('vendor.review.approved');
  });

  it('VendorReviewRejectedEvent', () => {
    const e = new VendorReviewRejectedEvent({
      aggregateId: UUID,
      payload: {
        reviewId: UUID, vendorId: UUID,
        reason: 'offensive', rejectedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.review.rejected');
  });

  it('VendorReviewFlaggedEvent', () => {
    const e = new VendorReviewFlaggedEvent({
      aggregateId: UUID,
      payload: {
        reviewId: UUID, vendorId: UUID,
        reason: 'spam', flagCount: 2, flaggedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.review.flagged');
  });

  it('VendorReviewHiddenEvent', () => {
    const e = new VendorReviewHiddenEvent({
      aggregateId: UUID,
      payload: {
        reviewId: UUID, vendorId: UUID,
        reason: 'manual', hiddenAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.review.hidden');
  });

  it('VendorReviewRestoredEvent', () => {
    const e = new VendorReviewRestoredEvent({
      aggregateId: UUID,
      payload: { reviewId: UUID, vendorId: UUID, restoredAt: NOW },
    });
    expect(e.type).toBe('vendor.review.restored');
  });
});
