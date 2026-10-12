import {
  VENDOR_APPROVAL_EVENT_TYPE,
  VendorApprovalSubmittedEvent,
  VendorApprovalApprovedEvent,
  VendorApprovalRejectedEvent,
  VendorApprovalInfoRequestedEvent,
  VendorApprovalResubmittedEvent,
  VendorApprovalAppealFiledEvent,
} from '../../../../src/module/domain/events/vendor-approval.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2026-02-01T00:00:00.000Z';

describe('Vendor approval events', () => {
  it('constants defined', () => {
    expect(VENDOR_APPROVAL_EVENT_TYPE.SUBMITTED).toBe('vendor.approval.submitted');
    expect(VENDOR_APPROVAL_EVENT_TYPE.APPEAL_FILED).toBe('vendor.approval.appeal_filed');
  });

  it('VendorApprovalSubmittedEvent', () => {
    const e = new VendorApprovalSubmittedEvent({
      aggregateId: UUID,
      payload: { approvalId: UUID, vendorId: UUID, submittedAt: NOW },
    });
    expect(e.type).toBe('vendor.approval.submitted');
    expect(e.aggregateType).toBe('VendorApproval');
  });

  it('VendorApprovalApprovedEvent', () => {
    const e = new VendorApprovalApprovedEvent({
      aggregateId: UUID,
      payload: { approvalId: UUID, vendorId: UUID, reviewedBy: UUID, note: 'ok', approvedAt: NOW },
    });
    expect(e.type).toBe('vendor.approval.approved');
  });

  it('VendorApprovalRejectedEvent', () => {
    const e = new VendorApprovalRejectedEvent({
      aggregateId: UUID,
      payload: {
        approvalId: UUID, vendorId: UUID, reviewedBy: UUID,
        reason: 'invalid', rejectedAt: NOW, appealDeadline: FUTURE,
      },
    });
    expect(e.type).toBe('vendor.approval.rejected');
  });

  it('VendorApprovalInfoRequestedEvent', () => {
    const e = new VendorApprovalInfoRequestedEvent({
      aggregateId: UUID,
      payload: {
        approvalId: UUID, vendorId: UUID, reviewedBy: UUID,
        note: 'need tax cert', requestedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.approval.info_requested');
  });

  it('VendorApprovalResubmittedEvent', () => {
    const e = new VendorApprovalResubmittedEvent({
      aggregateId: UUID,
      payload: {
        approvalId: UUID, vendorId: UUID,
        resubmissionCount: 1, resubmittedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.approval.resubmitted');
  });

  it('VendorApprovalAppealFiledEvent', () => {
    const e = new VendorApprovalAppealFiledEvent({
      aggregateId: UUID,
      payload: { approvalId: UUID, vendorId: UUID, filedAt: NOW },
    });
    expect(e.type).toBe('vendor.approval.appeal_filed');
  });
});
