import {
  VENDOR_RATING_EVENT_TYPE,
  VendorRatingReviewRecordedEvent,
  VendorRatingReviewRemovedEvent,
  VendorRatingRecalculatedEvent,
  VendorRatingAutoHiddenEvent,
  VendorRatingAutoFlaggedEvent,
} from '../../../../src/module/domain/events/vendor-rating.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor rating events', () => {
  it('constants defined', () => {
    expect(VENDOR_RATING_EVENT_TYPE.REVIEW_RECORDED).toBe('vendor.rating.review_recorded');
    expect(VENDOR_RATING_EVENT_TYPE.AUTO_HIDDEN).toBe('vendor.rating.auto_hidden');
  });

  it('VendorRatingReviewRecordedEvent', () => {
    const e = new VendorRatingReviewRecordedEvent({
      aggregateId: UUID,
      payload: {
        ratingId: UUID, vendorId: UUID, starRating: 5,
        totalReviews: 10, newOverall: 4.5, recordedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.rating.review_recorded');
    expect(e.aggregateType).toBe('VendorRating');
  });

  it('VendorRatingReviewRemovedEvent', () => {
    const e = new VendorRatingReviewRemovedEvent({
      aggregateId: UUID,
      payload: {
        ratingId: UUID, vendorId: UUID, starRating: 1,
        totalReviews: 9, newOverall: 4.7, removedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.rating.review_removed');
  });

  it('VendorRatingRecalculatedEvent', () => {
    const e = new VendorRatingRecalculatedEvent({
      aggregateId: UUID,
      payload: {
        ratingId: UUID, vendorId: UUID,
        oldOverall: 4.0, newOverall: 4.5,
        totalReviews: 10, recalculatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.rating.recalculated');
  });

  it('VendorRatingAutoHiddenEvent', () => {
    const e = new VendorRatingAutoHiddenEvent({
      aggregateId: UUID,
      payload: {
        ratingId: UUID, vendorId: UUID,
        overall: 1.5, totalReviews: 10, hiddenAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.rating.auto_hidden');
  });

  it('VendorRatingAutoFlaggedEvent', () => {
    const e = new VendorRatingAutoFlaggedEvent({
      aggregateId: UUID,
      payload: {
        ratingId: UUID, vendorId: UUID,
        overall: 2.5, totalReviews: 10, flaggedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.rating.auto_flagged');
  });
});
