import {
  VENDOR_VERIFICATION_EVENT_TYPE,
  VendorVerificationSubmittedEvent,
  VendorVerificationReviewStartedEvent,
  VendorVerificationApprovedEvent,
  VendorVerificationRejectedEvent,
  VendorVerificationExpiredEvent,
} from '../../../../src/module/domain/events/vendor-verification.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor verification events', () => {
  it('constants defined', () => {
    expect(VENDOR_VERIFICATION_EVENT_TYPE.SUBMITTED).toBe('vendor.verification.submitted');
    expect(VENDOR_VERIFICATION_EVENT_TYPE.APPROVED).toBe('vendor.verification.approved');
  });

  it('VendorVerificationSubmittedEvent', () => {
    const e = new VendorVerificationSubmittedEvent({
      aggregateId: UUID,
      payload: { verificationId: UUID, vendorId: UUID, submittedAt: NOW },
    });
    expect(e.type).toBe('vendor.verification.submitted');
    expect(e.aggregateType).toBe('VendorVerification');
  });

  it('VendorVerificationReviewStartedEvent', () => {
    const e = new VendorVerificationReviewStartedEvent({
      aggregateId: UUID,
      payload: { verificationId: UUID, vendorId: UUID, reviewedBy: UUID, startedAt: NOW },
    });
    expect(e.type).toBe('vendor.verification.review_started');
  });

  it('VendorVerificationApprovedEvent', () => {
    const e = new VendorVerificationApprovedEvent({
      aggregateId: UUID,
      payload: { verificationId: UUID, vendorId: UUID, reviewedBy: UUID, approvedAt: NOW },
    });
    expect(e.type).toBe('vendor.verification.approved');
  });

  it('VendorVerificationRejectedEvent', () => {
    const e = new VendorVerificationRejectedEvent({
      aggregateId: UUID,
      payload: {
        verificationId: UUID, vendorId: UUID, reviewedBy: UUID,
        reason: 'docs invalid', rejectedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.verification.rejected');
  });

  it('VendorVerificationExpiredEvent', () => {
    const e = new VendorVerificationExpiredEvent({
      aggregateId: UUID,
      payload: { verificationId: UUID, vendorId: UUID, expiredAt: NOW },
    });
    expect(e.type).toBe('vendor.verification.expired');
  });
});
