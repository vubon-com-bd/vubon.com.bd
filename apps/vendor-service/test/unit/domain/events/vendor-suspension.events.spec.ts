import {
  VENDOR_SUSPENSION_EVENT_TYPE,
  VendorSuspensionIssuedEvent,
  VendorSuspensionAppealedEvent,
  VendorSuspensionAppealApprovedEvent,
  VendorSuspensionAppealRejectedEvent,
  VendorSuspensionLiftedLogEvent,
  VendorSuspensionExtendedEvent,
  VendorSuspensionExpiredEvent,
} from '../../../../src/module/domain/events/vendor-suspension.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor suspension events', () => {
  it('constants defined', () => {
    expect(VENDOR_SUSPENSION_EVENT_TYPE.ISSUED).toBe('vendor.suspension.issued');
    expect(VENDOR_SUSPENSION_EVENT_TYPE.LIFTED_FROM_LOG).toBe('vendor.suspension.lifted_from_log');
  });

  it('VendorSuspensionIssuedEvent', () => {
    const e = new VendorSuspensionIssuedEvent({
      aggregateId: UUID,
      payload: {
        suspensionId: UUID, vendorId: UUID, reason: 'policy',
        durationDays: 30, suspendedBy: UUID, issuedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.suspension.issued');
    expect(e.aggregateType).toBe('VendorSuspension');
  });

  it('VendorSuspensionAppealedEvent', () => {
    const e = new VendorSuspensionAppealedEvent({
      aggregateId: UUID,
      payload: { suspensionId: UUID, vendorId: UUID, reason: 'unfair', appealedAt: NOW },
    });
    expect(e.type).toBe('vendor.suspension.appealed');
  });

  it('VendorSuspensionAppealApprovedEvent', () => {
    const e = new VendorSuspensionAppealApprovedEvent({
      aggregateId: UUID,
      payload: {
        suspensionId: UUID, vendorId: UUID,
        approvedBy: UUID, approvedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.suspension.appeal_approved');
  });

  it('VendorSuspensionAppealRejectedEvent', () => {
    const e = new VendorSuspensionAppealRejectedEvent({
      aggregateId: UUID,
      payload: {
        suspensionId: UUID, vendorId: UUID, rejectedBy: UUID,
        note: 'not valid', rejectedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.suspension.appeal_rejected');
  });

  it('VendorSuspensionLiftedLogEvent', () => {
    const e = new VendorSuspensionLiftedLogEvent({
      aggregateId: UUID,
      payload: { suspensionId: UUID, vendorId: UUID, liftedBy: UUID, liftedAt: NOW },
    });
    expect(e.type).toBe('vendor.suspension.lifted_from_log');
  });

  it('VendorSuspensionExtendedEvent', () => {
    const e = new VendorSuspensionExtendedEvent({
      aggregateId: UUID,
      payload: {
        suspensionId: UUID, vendorId: UUID,
        previousDuration: 30, newDuration: 45,
        extendedBy: UUID, extendedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.suspension.extended');
    expect(e.payload.newDuration).toBe(45);
  });

  it('VendorSuspensionExpiredEvent', () => {
    const e = new VendorSuspensionExpiredEvent({
      aggregateId: UUID,
      payload: { suspensionId: UUID, vendorId: UUID, expiredAt: NOW },
    });
    expect(e.type).toBe('vendor.suspension.expired');
  });
});
